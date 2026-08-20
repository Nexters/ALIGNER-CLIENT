import { useMutation } from "@tanstack/react-query";
import { sessionsApi } from "@/shared/api";
import type { SessionExerciseRecordResponse } from "@/shared/api/generated/data-contracts";
import type { Session } from "@/entities/session";
import { buildCompleteSessionRequest } from "./build-complete-request";

export function useCompleteSession(sessionId: number) {
  return useMutation<Session, unknown, SessionExerciseRecordResponse[]>({
    mutationFn: async (exerciseRecords) => {
      const response = await sessionsApi.complete(
        sessionId,
        buildCompleteSessionRequest(exerciseRecords),
      );
      return response.data;
    },
  });
}
