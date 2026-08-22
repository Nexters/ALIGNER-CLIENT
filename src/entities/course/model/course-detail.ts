import { useQuery } from "@tanstack/react-query";
import { coursesApi } from "@/shared/api";
import type {
  CourseDetailResponse,
  CourseStepExerciseResponse,
  CourseStepResponse,
} from "@/shared/api/generated/data-contracts";
import { getPoseImageSrc } from "./pose-images";

/** `GET /courses/{courseId}`(`CourseDetailResponse`)를 화면이 쓰기 좋은 모양으로 옮긴 도메인 타입 */
export type CourseStepExercise = {
  name: string;
  /** 운동 썸네일. 로컬 이미지 라이브러리가 없어 아직 항상 null이다. 없으면 플레이스홀더로 그린다 */
  imageAssetKey: string | null;
  category: string | null;
};

export type CourseStep = {
  stepOrder: number;
  exercises: CourseStepExercise[];
};

export type Course = {
  targetPoseName: string;
  /** 히어로 카드 배경 이미지. 로컬 자세 이미지로 이미 해석된 값이다 */
  targetPoseImageAssetKey: string | null;
  totalStepCount: number;
  exerciseCount: number;
  totalSetCount: number;
  /** 예상 수행 시간(초) */
  estimatedDurationSeconds: number | null;
  estimatedKcal: number | null;
  /** stepOrder 오름차순 */
  steps: CourseStep[];
};

export function courseDetailQueryKey(courseId: number) {
  return ["courses", courseId] as const;
}

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

export function useCourseDetail(courseId: number) {
  return useQuery({
    queryKey: courseDetailQueryKey(courseId),
    queryFn: () => getCourseDetail(courseId),
  });
}
