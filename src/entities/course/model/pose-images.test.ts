import { describe, expect, test } from "vitest";
import { getPoseImageSrc } from "./pose-images";
import fallbackImage from "@/shared/assets/images/yoga-1.png";
import wheelImage from "@/shared/assets/imgs/휠.png";

describe("getPoseImageSrc", () => {
  test("등록된 assetKey면 매핑된 이미지를 반환한다", () => {
    expect(getPoseImageSrc("target-pose/wheel")).toBe(wheelImage);
  });

  test("매핑에 없는 assetKey면 폴백 이미지를 반환한다", () => {
    expect(getPoseImageSrc("target-pose/upward-facing-dog")).toBe(fallbackImage);
  });

  test("assetKey가 null이면 폴백 이미지를 반환한다", () => {
    expect(getPoseImageSrc(null)).toBe(fallbackImage);
  });
});
