import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sessionsApi } from "@/shared/api";
import { sessionQueryKey, type Session } from "@/entities/session";
import type { PerceivedResult } from "./types";

export function useRecordPerceivedResult(sessionId: number) {
  const queryClient = useQueryClient();

  return useMutation<Session, unknown, PerceivedResult>({
    mutationFn: async (perceivedResult) => {
      const response = await sessionsApi.recordPerceivedResult(sessionId, { perceivedResult });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(sessionQueryKey(sessionId), data);
    },
  });
}
