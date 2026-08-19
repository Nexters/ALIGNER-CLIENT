import { resolvePoseImage } from "@/entities/target-pose";
import { coursesApi } from "@/shared/api";
import type {
  CourseDetailResponse,
  CourseStepExerciseResponse,
  CourseStepResponse,
} from "@/shared/api/generated/data-contracts";
import type { Course, CourseStep, CourseStepExercise } from "../model/types";

// 운동(스텝) 썸네일은 로컬 이미지 라이브러리가 없어 아직 못 채운다 — SequenceItem이 알아서 플레이스홀더로 그린다
function toCourseStepExercise(response: CourseStepExerciseResponse): CourseStepExercise {
  return {
    name: response.name!,
    imageAssetKey: null,
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
    targetPoseImageAssetKey: resolvePoseImage(response.targetPoseId),
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
