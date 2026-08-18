import fallbackImage from "@/shared/assets/images/yoga-1.png";
import bowImage from "@/shared/assets/imgs/활.png";
import wheelImage from "@/shared/assets/imgs/휠.png";
import camelImage from "@/shared/assets/imgs/낙타.png";
import boatImage from "@/shared/assets/imgs/보트.png";
import halfBoatImage from "@/shared/assets/imgs/반보트.png";
import bridgeImage from "@/shared/assets/imgs/브릿지.png";
import malasanaImage from "@/shared/assets/imgs/말라사나.png";
import fireLogImage from "@/shared/assets/imgs/파이어로그.png";
import sidePlankImage from "@/shared/assets/imgs/사이드플랭크.png";

// TODO: 실제 targetPoseImageAssetKey 값과 명명 규칙을 확인하면(ADR-0004) 이 매핑을 assetKey 기준으로 옮긴다.
const POSE_IMAGES: Record<string, string> = {
  활: bowImage,
  휠: wheelImage,
  낙타: camelImage,
  보트: boatImage,
  반보트: halfBoatImage,
  브릿지: bridgeImage,
  말라사나: malasanaImage,
  파이어로그: fireLogImage,
  사이드플랭크: sidePlankImage,
};

// API가 "휠"/"휠 자세" 중 어느 형태로 내려줄지 확정되지 않아 접미사를 떼고 매핑한다.
export function normalizePoseName(targetPoseName: string): string {
  return targetPoseName.replace(/\s*자세$/, "").trim();
}

export function getPoseImageSrc(targetPoseName: string): string {
  return POSE_IMAGES[normalizePoseName(targetPoseName)] ?? fallbackImage;
}
