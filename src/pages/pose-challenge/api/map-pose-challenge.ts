import { getPoseImageSrc } from "@/entities/course";
import type { PoseChallenge, PoseChallengeStatus } from "@/entities/pose";
import type {
  BodyPartResponse,
  TargetPoseProgressItem,
  TargetPoseProgressResponse,
} from "@/shared/api/generated/data-contracts";

export interface PoseChallengeGroup {
  bodyPart: string;
  poses: PoseChallenge[];
}

export interface PoseChallengeView {
  totalCount: number;
  inProgressCount: number;
  completedCount: number;
  groups: PoseChallengeGroup[];
}

function deriveStatus(item: TargetPoseProgressItem): PoseChallengeStatus {
  if (item.completed) return "completed";
  if (item.courseId == null) return "idle";
  return "inProgress";
}

function toPoseChallenge(item: TargetPoseProgressItem): PoseChallenge {
  return {
    id: String(item.targetPoseId),
    name: item.targetPoseName!,
    bodyPart: item.bodyPartCode!,
    // 아직 시작하지 않았으면 null이지만, "current=0은 미시작" 관례와 맞아떨어져 0으로 둔다.
    current: item.acquiredStampCount ?? 0,
    total: item.requiredStampCount!,
    imageSrc: getPoseImageSrc(item.targetPoseImageAssetKey ?? null),
    status: deriveStatus(item),
  };
}

export function mapPoseChallengeProgress(
  response: TargetPoseProgressResponse,
  bodyParts: BodyPartResponse[],
): PoseChallengeView {
  const groups: PoseChallengeGroup[] = bodyParts
    .map((bodyPart) => ({
      bodyPart: bodyPart.name!,
      poses: (response.targetPoses ?? [])
        .filter((item) => item.bodyPartCode === bodyPart.bodyPartCode)
        .map(toPoseChallenge),
    }))
    .filter((group) => group.poses.length > 0);

  return {
    totalCount: response.totalCount ?? 0,
    inProgressCount: response.inProgressCount ?? 0,
    completedCount: response.completedCount ?? 0,
    groups,
  };
}
