import { useQuery } from "@tanstack/react-query";
import { sessionsApi } from "@/shared/api";
import { sessionQueryKey, type Session } from "./session";

export function useSession(sessionId: number | null) {
  return useQuery<Session>({
    queryKey: sessionQueryKey(sessionId),
    queryFn: async () => {
      const response = await sessionsApi.getSession(sessionId as number);
      return response.data;
    },
    enabled: sessionId !== null,
    retry: false,
  });
}
