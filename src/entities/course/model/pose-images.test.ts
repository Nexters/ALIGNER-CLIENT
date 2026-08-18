import { describe, expect, test } from "vitest";
import { getPoseImageSrc } from "./pose-images";
import fallbackImage from "@/shared/assets/images/yoga-1.png";
import wheelImage from "@/shared/assets/imgs/휠.png";

describe("getPoseImageSrc", () => {
  test("등록된 자세명이면 매핑된 이미지를 반환한다", () => {
    expect(getPoseImageSrc("휠")).toBe(wheelImage);
  });

  test("자세명 뒤에 '자세'가 붙어 있어도 매핑한다", () => {
    expect(getPoseImageSrc("휠 자세")).toBe(wheelImage);
  });

  test("매핑에 없는 자세명이면 폴백 이미지를 반환한다", () => {
    expect(getPoseImageSrc("비둘기 자세")).toBe(fallbackImage);
  });
});
