import { mkdtempSync, mkdirSync, writeFileSync, existsSync, rmSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { generateIcons } from "./generate-icons";

let sourceDir: string;
let outputDir: string;

beforeEach(() => {
  const root = mkdtempSync(join(tmpdir(), "generate-icons-"));
  sourceDir = join(root, "assets", "icons");
  outputDir = join(root, "ui", "icons");
  mkdirSync(join(sourceDir, "mono"), { recursive: true });
  mkdirSync(join(sourceDir, "multicolor"), { recursive: true });
});

afterEach(() => {
  rmSync(join(sourceDir, ".."), { recursive: true, force: true });
});

describe("generateIcons", () => {
  it("mono SVG를 PascalCase + Icon 접미사 컴포넌트 파일로 생성한다", async () => {
    writeFileSync(
      join(sourceDir, "mono", "arrow-left.svg"),
      `<svg viewBox="0 0 24 24" fill="#000000"><path d="M10 10" /></svg>`,
    );

    await generateIcons(sourceDir, outputDir);

    expect(existsSync(join(outputDir, "mono", "ArrowLeftIcon.tsx"))).toBe(true);
  });

  it("mono SVG의 색상을 currentColor로 치환한다", async () => {
    writeFileSync(
      join(sourceDir, "mono", "arrow-left.svg"),
      `<svg viewBox="0 0 24 24"><path d="M4 12h16M4 6h16M4 18h16" stroke="#000000" /></svg>`,
    );

    await generateIcons(sourceDir, outputDir);

    const content = readFileSync(join(outputDir, "mono", "ArrowLeftIcon.tsx"), "utf-8");
    expect(content).toContain("currentColor");
    expect(content).not.toContain("#000000");
  });

  it("multicolor SVG의 원본 색상은 유지한다", async () => {
    writeFileSync(
      join(sourceDir, "multicolor", "logo.svg"),
      `<svg viewBox="0 0 24 24"><path d="M4 12h16M4 6h16M4 18h16" stroke="#123456" /></svg>`,
    );

    await generateIcons(sourceDir, outputDir);

    const content = readFileSync(join(outputDir, "multicolor", "LogoIcon.tsx"), "utf-8");
    expect(content).toContain("#123456");
    expect(content).not.toContain("currentColor");
  });

  it("생성된 컴포넌트는 named export이며 SVGProps를 받아 className을 cn()으로 병합한다", async () => {
    writeFileSync(
      join(sourceDir, "mono", "arrow-left.svg"),
      `<svg viewBox="0 0 24 24"><path d="M4 12h16M4 6h16M4 18h16" stroke="#000000" /></svg>`,
    );

    await generateIcons(sourceDir, outputDir);

    const content = readFileSync(join(outputDir, "mono", "ArrowLeftIcon.tsx"), "utf-8");
    expect(content).toContain('import { cn } from "@/shared/lib/cn";');
    expect(content).toContain("SVGProps<SVGSVGElement>");
    expect(content).toContain("className={cn(className)}");
    expect(content).toContain("export default function ArrowLeftIcon(");
  });

  it("모든 아이콘을 index.ts 배럴에서 재export한다", async () => {
    writeFileSync(
      join(sourceDir, "mono", "arrow-left.svg"),
      `<svg viewBox="0 0 24 24"><path d="M4 12h16M4 6h16M4 18h16" stroke="#000000" /></svg>`,
    );
    writeFileSync(
      join(sourceDir, "multicolor", "logo.svg"),
      `<svg viewBox="0 0 24 24"><path d="M4 12h16M4 6h16M4 18h16" stroke="#123456" /></svg>`,
    );

    await generateIcons(sourceDir, outputDir);

    const barrel = readFileSync(join(outputDir, "index.ts"), "utf-8");
    expect(barrel).toContain('export { default as ArrowLeftIcon } from "./mono/ArrowLeftIcon";');
    expect(barrel).toContain('export { default as LogoIcon } from "./multicolor/LogoIcon";');
  });

  it("원본 SVG가 삭제된 뒤 재실행하면 이전 산출물도 함께 사라진다", async () => {
    writeFileSync(
      join(sourceDir, "mono", "arrow-left.svg"),
      `<svg viewBox="0 0 24 24"><path d="M4 12h16M4 6h16M4 18h16" stroke="#000000" /></svg>`,
    );
    await generateIcons(sourceDir, outputDir);
    expect(existsSync(join(outputDir, "mono", "ArrowLeftIcon.tsx"))).toBe(true);

    rmSync(join(sourceDir, "mono", "arrow-left.svg"));
    writeFileSync(
      join(sourceDir, "mono", "arrow-right.svg"),
      `<svg viewBox="0 0 24 24"><path d="M4 12h16M4 6h16M4 18h16" stroke="#000000" /></svg>`,
    );
    await generateIcons(sourceDir, outputDir);

    expect(existsSync(join(outputDir, "mono", "ArrowLeftIcon.tsx"))).toBe(false);
    expect(existsSync(join(outputDir, "mono", "ArrowRightIcon.tsx"))).toBe(true);
  });

  it("서로 다른 아이콘이 원본에서 같은 id를 써도 생성된 컴포넌트끼리 id가 충돌하지 않는다", async () => {
    const svgWithClipPath = (label: string) =>
      `<svg viewBox="0 0 36 36"><g clip-path="url(#a)"><path d="M9 9h${label} 18" /></g><defs><clipPath id="a"><rect width="36" height="36" /></clipPath></defs></svg>`;
    writeFileSync(join(sourceDir, "multicolor", "previous.svg"), svgWithClipPath("3v"));
    writeFileSync(join(sourceDir, "multicolor", "next.svg"), svgWithClipPath("5v"));

    await generateIcons(sourceDir, outputDir);

    const previous = readFileSync(join(outputDir, "multicolor", "PreviousIcon.tsx"), "utf-8");
    const next = readFileSync(join(outputDir, "multicolor", "NextIcon.tsx"), "utf-8");
    const extractClipPathId = (content: string) => content.match(/clipPath id="([^"]+)"/)?.[1];

    const previousId = extractClipPathId(previous);
    const nextId = extractClipPathId(next);
    expect(previousId).toBeDefined();
    expect(nextId).toBeDefined();
    expect(previousId).not.toBe(nextId);
    expect(previous).toContain(`clipPath="url(#${previousId})"`);
    expect(next).toContain(`clipPath="url(#${nextId})"`);
  });
});
