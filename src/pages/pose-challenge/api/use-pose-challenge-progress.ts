import { useQuery } from "@tanstack/react-query";
import { getBodyParts } from "./get-body-parts";
import { getTargetPoseProgress } from "./get-target-pose-progress";

export function useBodyParts() {
  return useQuery({
    queryKey: ["screening", "body-parts"] as const,
    queryFn: getBodyParts,
    retry: false,
  });
}

export function useTargetPoseProgress() {
  return useQuery({
    queryKey: ["courses", "progress", "target-poses"] as const,
    queryFn: getTargetPoseProgress,
    retry: false,
  });
}
