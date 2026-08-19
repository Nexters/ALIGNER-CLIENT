import { useQuery } from "@tanstack/react-query";
import { resolvePoseImage } from "@/entities/target-pose";
import { catalogApi } from "@/shared/api";
import type { TargetPoseSummaryResponse } from "@/shared/api/generated/data-contracts";

export type TargetPose = {
  id: number;
  name: string;
  image: string;
};

function toTargetPose(response: TargetPoseSummaryResponse): TargetPose {
  return {
    id: response.targetPoseId!,
    name: response.name!,
    image: resolvePoseImage(response.targetPoseId),
  };
}

export function useTargetPoses() {
  const { data, ...rest } = useQuery({
    queryKey: ["catalog", "target-poses"],
    queryFn: async () => {
      const response = await catalogApi.getTargetPoses();
      return response.data.map(toTargetPose);
    },
  });

  return { poses: data ?? [], ...rest };
}
