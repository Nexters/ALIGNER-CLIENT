import 낙타 from "@/shared/assets/imgs/낙타.png";
import 말라사나 from "@/shared/assets/imgs/말라사나.png";
import 반보트 from "@/shared/assets/imgs/반보트.png";
import 보트 from "@/shared/assets/imgs/보트.png";
import 브릿지 from "@/shared/assets/imgs/브릿지.png";
import 사이드플랭크 from "@/shared/assets/imgs/사이드플랭크.png";
import 업독 from "@/shared/assets/imgs/target-pose/업독.png";
import 파이어로그 from "@/shared/assets/imgs/파이어로그.png";
import 휠 from "@/shared/assets/imgs/휠.png";

// GET /catalog/target-poses의 targetPoseId 기준 (dev API로 확인한 실제 값). 서버의 imageAssetKey는 쓰지 않는다
const POSE_IMAGE_BY_TARGET_POSE_ID: Record<number, string> = {
  1: 업독,
  2: 낙타,
  3: 휠,
  4: 반보트,
  5: 보트,
  6: 사이드플랭크,
  7: 브릿지,
  8: 말라사나,
  9: 파이어로그,
};

export function resolvePoseImage(targetPoseId: number): string {
  return POSE_IMAGE_BY_TARGET_POSE_ID[targetPoseId] ?? 파이어로그;
}
