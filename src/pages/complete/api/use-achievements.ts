import { useQuery } from "@tanstack/react-query";
import { sessionsApi } from "@/shared/api";
import type { AchievementResponse } from "@/shared/api/generated/data-contracts";

export function useAchievements() {
  return useQuery<AchievementResponse>({
    queryKey: ["sessions", "achievements"] as const,
    queryFn: async () => {
      const response = await sessionsApi.getAchievement();
      return response.data;
    },
    retry: false,
  });
}
