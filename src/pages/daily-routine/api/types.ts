// GET /courses/{courseId} 응답 스펙 (스웨거 CourseDetailResponse 기준)
export interface CourseStepExerciseResponse {
  courseStepExerciseId: number;
  exerciseId: number;
  name: string;
  imageAssetKey: string | null;
  category: string | null;
  displayOrder: number;
  durationSeconds: number | null;
  setCount: number | null;
  estimatedKcal: number | null;
}

export interface CourseStepResponse {
  courseStepId: number;
  stepOrder: number;
  completed: boolean;
  completedAt: string | null;
  exercises: CourseStepExerciseResponse[];
}

export interface CourseDetailResponse {
  courseId: number;
  targetPoseId: number;
  targetPoseName: string;
  targetPoseImageAssetKey: string | null;
  name: string;
  recommendationReason: string | null;
  completedStepCount: number;
  totalStepCount: number;
  exerciseCount: number;
  totalSetCount: number;
  estimatedDurationSeconds: number | null;
  estimatedKcal: number | null;
  steps: CourseStepResponse[];
}
