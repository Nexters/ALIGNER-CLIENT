import { useQuery } from "@tanstack/react-query";
import { catalogApi } from "@/shared/api";
import type { ExerciseDetailResponse } from "@/shared/api/generated/data-contracts";

// TODO: pages/exercise-detail/api/use-exercise.ts와 같은 GET /catalog/exercises/{id} 조회가
// 이제 페이지 두 곳에서 쓰인다. entities/session의 useSession처럼(ADR-0007) entities로 옮길 후보.
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
