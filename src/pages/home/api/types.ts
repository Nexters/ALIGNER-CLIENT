// GET /courses/today 응답 스펙 (스웨거 TodayCourseResponse 기준)
export type TargetPoseBodyPartCode = "BACK" | "ABDOMEN" | "PELVIS";

export interface TomorrowCoursePreviewResponse {
  targetPoseId: number;
  targetPoseName: string;
  targetPoseImageAssetKey: string | null;
  bodyPartCode: TargetPoseBodyPartCode;
  level: number;
  name: string;
  recommendationReason: string | null;
  totalStepCount: number;
  exerciseCount: number;
  totalSetCount: number;
  estimatedDurationSeconds: number | null;
  estimatedKcal: number | null;
}

export interface TodayCourseResponse {
  courseId: number;
  targetPoseId: number;
  targetPoseName: string;
  targetPoseImageAssetKey: string | null;
  targetPoseLevel: number | null;
  name: string;
  recommendationReason: string | null;
  currentStepOrder: number | null;
  completedStepCount: number;
  totalStepCount: number;
  exerciseCount: number;
  totalSetCount: number;
  estimatedDurationSeconds: number | null;
  estimatedKcal: number | null;
  completed: boolean;
  tomorrowPreview: TomorrowCoursePreviewResponse | null;
}
