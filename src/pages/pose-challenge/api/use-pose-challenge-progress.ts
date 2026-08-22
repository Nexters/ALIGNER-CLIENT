import { useQuery } from "@tanstack/react-query";
import { bodyPartsQueryKey } from "@/entities/screening";
import { getBodyParts } from "@/features/screening-flow";
import { coursesApi } from "@/shared/api";

export function useBodyParts() {
  return useQuery({
    queryKey: bodyPartsQueryKey(),
    queryFn: getBodyParts,
    retry: false,
  });
}

export function useTargetPoseProgress() {
  return useQuery({
    queryKey: ["courses", "progress", "target-poses"] as const,
    queryFn: async () => {
      const response = await coursesApi.getTargetPoseProgress();
      return response.data;
    },
    retry: false,
  });
}
