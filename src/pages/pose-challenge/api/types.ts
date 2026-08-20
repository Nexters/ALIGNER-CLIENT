// GET /screening/body-parts, GET /courses/progress/target-poses 응답 스펙
export type BodyPartCode = "BACK" | "ABDOMEN" | "PELVIS";

export interface BodyPartResponse {
  bodyPartCode: BodyPartCode;
  name: string;
}

export interface TargetPoseProgressItem {
  targetPoseId: number;
  targetPoseName: string;
  targetPoseImageAssetKey: string | null;
  bodyPartCode: BodyPartCode;
  level: number;
  /** 이 자세의 코스 식별자. 아직 시작하지 않았으면 null */
  courseId: number | null;
  completedStepCount: number | null;
  totalStepCount: number | null;
  /** 완주 횟수(도장 수). 화면의 `3/4`의 분자. 아직 시작하지 않았으면 null(0이 아니다) */
  acquiredStampCount: number | null;
  /** 완성에 필요한 완주 횟수. 화면의 `3/4`의 분모 */
  requiredStampCount: number;
  completed: boolean;
}

export interface TargetPoseProgressResponse {
  totalCount: number;
  inProgressCount: number;
  completedCount: number;
  targetPoses: TargetPoseProgressItem[];
}
