import { describe, expect, test } from "vitest";
import { getPoseImageSrc } from "./pose-images";
import fallbackImage from "@/shared/assets/images/yoga-1.png";
import upwardDogImage from "@/shared/assets/imgs/업독.png";
import wheelImage from "@/shared/assets/imgs/휠.png";

describe("getPoseImageSrc", () => {
  test("등록된 assetKey면 매핑된 이미지를 반환한다", () => {
    expect(getPoseImageSrc("target-pose/wheel")).toBe(wheelImage);
    expect(getPoseImageSrc("target-pose/upward-facing-dog")).toBe(upwardDogImage);
  });

  test("매핑에 없는 assetKey면 폴백 이미지를 반환한다", () => {
    expect(getPoseImageSrc("target-pose/unknown")).toBe(fallbackImage);
  });

  test("assetKey가 null이면 폴백 이미지를 반환한다", () => {
    expect(getPoseImageSrc(null)).toBe(fallbackImage);
  });
});
