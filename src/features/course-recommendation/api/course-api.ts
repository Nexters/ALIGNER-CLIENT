import { getPoseImageSrc } from "@/entities/course";
import { coursesApi } from "@/shared/api";
import type {
  CourseDetailResponse,
  CourseStepExerciseResponse,
  CourseStepResponse,
} from "@/shared/api/generated/data-contracts";
import type { Course, CourseStep, CourseStepExercise } from "../model/types";

// 운동 이미지는 target-pose/* 매핑 테이블에 없는 exercise/* 네임스페이스라 지금은 항상 폴백으로 빠진다
function toCourseStepExercise(response: CourseStepExerciseResponse): CourseStepExercise {
  return {
    name: response.name!,
    imageAssetKey: getPoseImageSrc(response.imageAssetKey ?? null),
    category: response.category ?? null,
  };
}

function toCourseStep(response: CourseStepResponse): CourseStep {
  return {
    stepOrder: response.stepOrder!,
    exercises: (response.exercises ?? []).map(toCourseStepExercise),
  };
}

function toCourse(response: CourseDetailResponse): Course {
  return {
    targetPoseName: response.targetPoseName!,
    targetPoseImageAssetKey: getPoseImageSrc(response.targetPoseImageAssetKey ?? null),
    totalStepCount: response.totalStepCount!,
    exerciseCount: response.exerciseCount!,
    totalSetCount: response.totalSetCount!,
    estimatedDurationSeconds: response.estimatedDurationSeconds ?? null,
    estimatedKcal: response.estimatedKcal ?? null,
    steps: (response.steps ?? []).map(toCourseStep),
  };
}

export async function getCourseDetail(courseId: number): Promise<Course> {
  const response = await coursesApi.getCourseDetail(courseId);
  return toCourse(response.data);
}
