import { useQuery } from "@tanstack/react-query";
import { catalogApi } from "@/shared/api";
import type { ExerciseDetailResponse } from "@/shared/api/generated/data-contracts";
import { exerciseQueryKey } from "./exercise";

export function useExercise(exerciseId: number | null) {
  return useQuery<ExerciseDetailResponse>({
    queryKey: exerciseQueryKey(exerciseId),
    queryFn: async () => {
      const response = await catalogApi.getExercise(exerciseId as number);
      return response.data;
    },
    enabled: exerciseId !== null,
    retry: false,
  });
}
