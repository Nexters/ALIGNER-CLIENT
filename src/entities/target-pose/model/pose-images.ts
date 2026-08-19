import 낙타 from "@/shared/assets/imgs/낙타.png";
import 말라사나 from "@/shared/assets/imgs/말라사나.png";
import 반보트 from "@/shared/assets/imgs/반보트.png";
import 보트 from "@/shared/assets/imgs/보트.png";
import 브릿지 from "@/shared/assets/imgs/브릿지.png";
import 사이드플랭크 from "@/shared/assets/imgs/사이드플랭크.png";
import 파이어로그 from "@/shared/assets/imgs/파이어로그.png";
import 휠 from "@/shared/assets/imgs/휠.png";

// GET /catalog/target-poses 실제 응답의 targetPoseId 기준. 매핑에 없는 id(예: "업독" id 1)는 파이어로그 이미지로 대체한다
const POSE_IMAGE_BY_ID: Record<number, string> = {
  2: 낙타,
  3: 휠,
  4: 반보트,
  5: 보트,
  6: 사이드플랭크,
  7: 브릿지,
  8: 말라사나,
  9: 파이어로그,
};

export function resolvePoseImage(targetPoseId: number | null | undefined): string {
  if (targetPoseId == null) return 파이어로그;
  return POSE_IMAGE_BY_ID[targetPoseId] ?? 파이어로그;
}
