import fallbackImage from "@/shared/assets/images/yoga-1.png";
import wheelImage from "@/shared/assets/imgs/휠.png";
import camelImage from "@/shared/assets/imgs/낙타.png";
import boatImage from "@/shared/assets/imgs/보트.png";
import halfBoatImage from "@/shared/assets/imgs/반보트.png";
import bridgeImage from "@/shared/assets/imgs/브릿지.png";
import malasanaImage from "@/shared/assets/imgs/말라사나.png";
import fireLogImage from "@/shared/assets/imgs/파이어로그.png";
import sidePlankImage from "@/shared/assets/imgs/사이드플랭크.png";

export const FALLBACK_POSE_IMAGE = fallbackImage;

// dev 카탈로그(GET /catalog/target-poses)로 확인한 실제 imageAssetKey 값이다(ADR-0004 후속).
// "활"(bow) 로컬 파일은 실제 카탈로그의 9개 목표 자세(업독/낙타자세/휠/반 보트/보트자세/
// 사이드 플랭크/브릿지/말라사나/파이어로그)에 없어 매핑하지 않는다 — 업독은 로컬 이미지가 없다.
const POSE_IMAGES: Record<string, string> = {
  "target-pose/wheel": wheelImage,
  "target-pose/camel": camelImage,
  "target-pose/boat": boatImage,
  "target-pose/half-boat": halfBoatImage,
  "target-pose/bridge": bridgeImage,
  "target-pose/malasana": malasanaImage,
  "target-pose/fire-log": fireLogImage,
  "target-pose/side-plank": sidePlankImage,
};

export function getPoseImageSrc(imageAssetKey: string | null): string {
  if (imageAssetKey === null) return fallbackImage;
  return POSE_IMAGES[imageAssetKey] ?? fallbackImage;
}
