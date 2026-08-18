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
      // DurationBadge는 숫자 링 UI라 "-" 표기를 지원하지 않는다. 예상 시간이 없으면 0분(빈 링)으로 그린다.
      minutes:
        response.estimatedDurationSeconds != null
          ? Math.round(response.estimatedDurationSeconds / 60)
          : 0,
      exerciseCount: response.exerciseCount,
      setCount: response.totalSetCount,
      kcal: response.estimatedKcal,
      imageSrc: getPoseImageSrc(response.targetPoseName),
    },
    targetPoseName: response.targetPoseName,
    completed: response.completed,
  };
}
