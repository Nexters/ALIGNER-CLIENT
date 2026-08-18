import { getPoseImageSrc, type CourseProgress, type TodayWorkoutSummary } from "@/entities/course";
import type { TodayCourseResponse } from "./types";

export interface TodayCourseView {
  progress: CourseProgress;
  workout: TodayWorkoutSummary;
  targetPoseName: string;
  completed: boolean;
}

export function mapTodayCourseResponse(response: TodayCourseResponse): TodayCourseView {
  return {
    progress: {
      current: response.completedStepCount,
      total: response.totalStepCount,
    },
    workout: {
      minutes:
        response.estimatedDurationSeconds != null
          ? Math.round(response.estimatedDurationSeconds / 60)
          : null,
      exerciseCount: response.exerciseCount,
      setCount: response.totalSetCount,
      kcal: response.estimatedKcal,
      imageSrc: getPoseImageSrc(response.targetPoseImageAssetKey),
    },
    targetPoseName: response.targetPoseName,
    completed: response.completed,
  };
}
