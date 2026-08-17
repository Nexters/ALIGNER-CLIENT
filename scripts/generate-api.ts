import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { format, resolveConfig } from "prettier";

const SWAGGER_SPEC_URL = "http://121.78.183.194/v3/api-docs";

const HTTP_CLIENT_VALUE_EXPORTS = new Set(["ContentType", "HttpClient"]);

function splitImportNames(namesBlob: string): string[] {
  return namesBlob
    .split(",")
    .map((name) => name.trim())
    .filter(Boolean);
}

/**
 * swagger-typescript-api generates plain `import { ... }` for names that are
 * only ever used in type position. Under this project's `verbatimModuleSyntax`,
 * such imports must be `import type` or they throw at runtime (the interfaces
 * emit no JS). Rewrite the two known cross-file imports accordingly.
 */
function fixVerbatimModuleSyntax(outputDir: string): void {
  const files = readdirSync(outputDir).filter((file) => extname(file) === ".ts");

  for (const file of files) {
    const filePath = join(outputDir, file);
    let code = readFileSync(filePath, "utf-8");

    code = code.replace(
      /import\s*\{([^}]*)\}\s*from\s*"\.\/data-contracts";/,
      (whole, namesBlob: string) => {
        const names = splitImportNames(namesBlob);
        return names.length
          ? `import type { ${names.join(", ")} } from "./data-contracts";`
          : whole;
      },
    );

    code = code.replace(
      /import\s*\{([^}]*)\}\s*from\s*"\.\/http-client";/,
      (whole, namesBlob: string) => {
        const names = splitImportNames(namesBlob);
        if (names.length === 0) return whole;
        const values = names.filter((name) => HTTP_CLIENT_VALUE_EXPORTS.has(name));
        const types = names.filter((name) => !HTTP_CLIENT_VALUE_EXPORTS.has(name));
        const statements = [
          values.length ? `import { ${values.join(", ")} } from "./http-client";` : "",
          types.length ? `import type { ${types.join(", ")} } from "./http-client";` : "",
        ].filter(Boolean);
        return statements.join("\n");
      },
    );

    writeFileSync(filePath, code);
  }
}

async function formatGeneratedFiles(outputDir: string): Promise<void> {
  const files = readdirSync(outputDir).filter((file) => extname(file) === ".ts");
  for (const file of files) {
    const filePath = join(outputDir, file);
    const code = readFileSync(filePath, "utf-8");
    const config = await resolveConfig(filePath);
    writeFileSync(filePath, await format(code, { ...config, filepath: filePath }));
  }
}

export async function generateApiClient(outputDir: string): Promise<void> {
  execFileSync(
    "swagger-typescript-api",
    [
      "generate",
      "-p",
      SWAGGER_SPEC_URL,
      "-o",
      outputDir,
      "-n",
      "Api.ts",
      "--modular",
      "--single-http-client",
    ],
    { stdio: "inherit" },
  );

  fixVerbatimModuleSyntax(outputDir);
  await formatGeneratedFiles(outputDir);
}

const isMain =
  process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isMain) {
  const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
  await generateApiClient(join(rootDir, "src/shared/api/generated"));
}
