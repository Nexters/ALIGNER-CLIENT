import upwardDogImage from "@/shared/assets/imgs/target-pose/without-bg/upward-facing-dog.png";
import wheelImage from "@/shared/assets/imgs/target-pose/without-bg/wheel.png";
import camelImage from "@/shared/assets/imgs/target-pose/without-bg/camel.png";
import boatImage from "@/shared/assets/imgs/target-pose/without-bg/boat.png";
import halfBoatImage from "@/shared/assets/imgs/target-pose/without-bg/half-boat.png";
import bridgeImage from "@/shared/assets/imgs/target-pose/without-bg/bridge.png";
import malasanaImage from "@/shared/assets/imgs/target-pose/without-bg/malasana.png";
import fireLogImage from "@/shared/assets/imgs/target-pose/without-bg/fire-log.png";
import sidePlankImage from "@/shared/assets/imgs/target-pose/without-bg/side-plank.png";
import upwardDogWithBgImage from "@/shared/assets/imgs/target-pose/with-bg/upward-facing-dog.png";
import wheelWithBgImage from "@/shared/assets/imgs/target-pose/with-bg/wheel.png";
import camelWithBgImage from "@/shared/assets/imgs/target-pose/with-bg/camel.png";
import boatWithBgImage from "@/shared/assets/imgs/target-pose/with-bg/boat.png";
import halfBoatWithBgImage from "@/shared/assets/imgs/target-pose/with-bg/half-boat.png";
import bridgeWithBgImage from "@/shared/assets/imgs/target-pose/with-bg/bridge.png";
import malasanaWithBgImage from "@/shared/assets/imgs/target-pose/with-bg/malasana.png";
import fireLogWithBgImage from "@/shared/assets/imgs/target-pose/with-bg/fire-log.png";
import sidePlankWithBgImage from "@/shared/assets/imgs/target-pose/with-bg/side-plank.png";

export const FALLBACK_POSE_IMAGE = camelImage;

// dev 카탈로그(GET /catalog/target-poses)로 확인한 실제 imageAssetKey 값이다(ADR-0004 후속).
const POSE_IMAGES: Record<string, string> = {
  "target-pose/upward-facing-dog": upwardDogImage,
  "target-pose/wheel": wheelImage,
  "target-pose/camel": camelImage,
  "target-pose/boat": boatImage,
  "target-pose/half-boat": halfBoatImage,
  "target-pose/bridge": bridgeImage,
  "target-pose/malasana": malasanaImage,
  "target-pose/fire-log": fireLogImage,
  "target-pose/side-plank": sidePlankImage,
};

// 배경 있는 버전 — 온보딩 핀포즈 그리드 전용 (다른 화면은 배경 없는 썸네일을 쓴다)
const POSE_IMAGES_WITH_BG: Record<string, string> = {
  "target-pose/upward-facing-dog": upwardDogWithBgImage,
  "target-pose/wheel": wheelWithBgImage,
  "target-pose/camel": camelWithBgImage,
  "target-pose/boat": boatWithBgImage,
  "target-pose/half-boat": halfBoatWithBgImage,
  "target-pose/bridge": bridgeWithBgImage,
  "target-pose/malasana": malasanaWithBgImage,
  "target-pose/fire-log": fireLogWithBgImage,
  "target-pose/side-plank": sidePlankWithBgImage,
};

// GET /catalog/target-poses의 targetPoseId 기준 (dev API로 확인한 실제 값)
const TARGET_POSE_ID_TO_ASSET_KEY: Record<number, string> = {
  1: "target-pose/upward-facing-dog",
  2: "target-pose/camel",
  3: "target-pose/wheel",
  4: "target-pose/half-boat",
  5: "target-pose/boat",
  6: "target-pose/side-plank",
  7: "target-pose/bridge",
  8: "target-pose/malasana",
  9: "target-pose/fire-log",
};

export function getPoseImageSrc(imageAssetKey: string | null): string {
  if (imageAssetKey === null) return FALLBACK_POSE_IMAGE;
  return POSE_IMAGES[imageAssetKey] ?? FALLBACK_POSE_IMAGE;
}

export function resolvePoseImageByTargetPoseId(targetPoseId: number): string {
  const assetKey = TARGET_POSE_ID_TO_ASSET_KEY[targetPoseId];
  if (assetKey === undefined) return camelWithBgImage;
  return POSE_IMAGES_WITH_BG[assetKey] ?? camelWithBgImage;
}

// API가 내려주는 썸네일 URL이 있으면 그대로 쓰고, 없으면 기존 asset key 매핑으로 폴백한다.
export function resolveThumbnailSrc(
  thumbnailUrl: string | null | undefined,
  imageAssetKey: string | null,
): string {
  return thumbnailUrl ?? getPoseImageSrc(imageAssetKey);
}
