import { useQuery } from "@tanstack/react-query";
import { getExercise } from "./get-exercise";

export function useExercise(exerciseId: number | null) {
  return useQuery({
    queryKey: ["catalog", "exercises", exerciseId] as const,
    queryFn: () => getExercise(exerciseId as number),
    enabled: exerciseId !== null,
    retry: false,
  });
}
