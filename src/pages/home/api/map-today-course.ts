import { getPoseImageSrc, type CourseProgress, type TodayWorkoutSummary } from "@/entities/course";
import type { TodayCourseResponse } from "@/shared/api/generated/data-contracts";

export interface TodayCourseView {
  progress: CourseProgress;
  workout: TodayWorkoutSummary;
  targetPoseName: string;
  completed: boolean;
}

export function mapTodayCourseResponse(response: TodayCourseResponse): TodayCourseView {
  return {
    progress: {
      current: response.completedStepCount ?? 0,
      total: response.totalStepCount ?? 0,
    },
    workout: {
      minutes:
        response.estimatedDurationSeconds != null
          ? Math.round(response.estimatedDurationSeconds / 60)
          : null,
      exerciseCount: response.exerciseCount ?? 0,
      setCount: response.totalSetCount ?? 0,
      kcal: response.estimatedKcal ?? null,
      imageSrc: getPoseImageSrc(response.targetPoseImageAssetKey ?? null),
    },
    targetPoseName: response.targetPoseName ?? "",
    completed: response.completed ?? false,
  };
}
