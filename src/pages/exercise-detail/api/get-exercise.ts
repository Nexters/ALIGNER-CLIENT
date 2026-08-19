import { api } from "@/shared/api";
import type { ExerciseDetailResponse } from "./types";

export function getExercise(exerciseId: number) {
  return api.get<ExerciseDetailResponse>(`catalog/exercises/${exerciseId}`);
}
