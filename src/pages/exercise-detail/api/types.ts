import type { ExerciseDetailResponse as GeneratedExerciseDetailResponse } from "@/shared/api/generated/data-contracts";

// TODO(소정): stepOrder/totalStepCount는 아직 스웨거 스펙에 없는 임시 필드명이다.
// 실제 필드명이 확정되면 이름을 맞추고 이 확장을 없앤다.
export type ExerciseDetailResponse = GeneratedExerciseDetailResponse & {
  stepOrder?: number | null;
  totalStepCount?: number | null;
};
