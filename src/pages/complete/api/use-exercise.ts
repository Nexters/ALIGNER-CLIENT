import { useQuery } from "@tanstack/react-query";
import { catalogApi } from "@/shared/api";
import type { ExerciseDetailResponse } from "@/shared/api/generated/data-contracts";

export function useExercise(exerciseId: number | null) {
  return useQuery<ExerciseDetailResponse>({
    queryKey: ["catalog", "exercises", exerciseId] as const,
    queryFn: async () => {
      const response = await catalogApi.getExercise(exerciseId as number);
      return response.data;
    },
    enabled: exerciseId !== null,
    retry: false,
  });
}
