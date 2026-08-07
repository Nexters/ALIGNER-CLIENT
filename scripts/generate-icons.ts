import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { transform } from "@svgr/core";
import jsxPlugin from "@svgr/plugin-jsx";
import svgoPlugin from "@svgr/plugin-svgo";
import { format, resolveConfig } from "prettier";
import type { Config as SvgoConfig } from "svgo";

const VARIANTS = ["mono", "multicolor"] as const;
type Variant = (typeof VARIANTS)[number];

function toComponentName(fileName: string): string {
  const base = basename(fileName, extname(fileName));
  const pascal = base
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");
  return `${pascal}Icon`;
}

function svgoConfigFor(variant: Variant, idPrefix: string): SvgoConfig {
  const plugins: NonNullable<SvgoConfig["plugins"]> = [
    { name: "preset-default", params: { overrides: { removeViewBox: false } } },
  ];
  if (variant === "mono") {
    plugins.push({ name: "convertColors", params: { currentColor: true } });
  }
  plugins.push({ name: "prefixIds", params: { prefix: idPrefix } });
  return { plugins };
}

function toDefaultExportFunction(code: string, componentName: string): string {
  const pattern = new RegExp(
    `const ${componentName} = (\\(.*?\\)) => ([\\s\\S]*);\\nexport default ${componentName};\\n?`,
  );
  return code.replace(
    pattern,
    (_match, params: string, jsxExpr: string) =>
      `export default function ${componentName}${params} {\n  return ${jsxExpr};\n}\n`,
  );
}

async function transformSvg(
  svgSource: string,
  componentName: string,
  variant: Variant,
): Promise<string> {
  const rawCode = await transform(
    svgSource,
    {
      typescript: true,
      exportType: "default",
      expandProps: true,
      jsxRuntime: "automatic",
      plugins: [svgoPlugin, jsxPlugin],
      svgoConfig: svgoConfigFor(variant, `${variant}-${componentName}`),
    },
    { componentName },
  );

  const withClassName = rawCode
    .replace(
      "(props: SVGProps<SVGSVGElement>)",
      "({ className, ...props }: SVGProps<SVGSVGElement>)",
    )
    .replace("{...props}", "className={cn(className)} {...props}")
    .replace(
      'import type { SVGProps } from "react";',
      'import type { SVGProps } from "react";\nimport { cn } from "@/shared/lib/cn";\n',
    );

  return toDefaultExportFunction(withClassName, componentName);
}

async function formatCode(code: string, filePath: string): Promise<string> {
  const config = await resolveConfig(filePath);
  return format(code, { ...config, filepath: filePath });
}

export async function generateIcons(sourceDir: string, outputDir: string): Promise<void> {
  rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(outputDir, { recursive: true });

  const barrelLines: string[] = [];

  for (const variant of VARIANTS) {
    const variantSourceDir = join(sourceDir, variant);
    if (!existsSync(variantSourceDir)) continue;

    const variantOutputDir = join(outputDir, variant);
    mkdirSync(variantOutputDir, { recursive: true });

    const svgFiles = readdirSync(variantSourceDir).filter((file) => extname(file) === ".svg");
    for (const file of svgFiles) {
      const componentName = toComponentName(file);
      const svgSource = readFileSync(join(variantSourceDir, file), "utf-8");
      const outputFile = join(variantOutputDir, `${componentName}.tsx`);
      const code = await transformSvg(svgSource, componentName, variant);
      writeFileSync(outputFile, await formatCode(code, outputFile));
      barrelLines.push(
        `export { default as ${componentName} } from "./${variant}/${componentName}";`,
      );
    }
  }

  const barrelFile = join(outputDir, "index.ts");
  const barrelCode = barrelLines.sort().join("\n") + (barrelLines.length ? "\n" : "");
  writeFileSync(
    barrelFile,
    barrelLines.length ? await formatCode(barrelCode, barrelFile) : barrelCode,
  );
}

const isMain =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
  await generateIcons(
    join(rootDir, "src/shared/assets/icons"),
    join(rootDir, "src/shared/ui/icons"),
  );
}
