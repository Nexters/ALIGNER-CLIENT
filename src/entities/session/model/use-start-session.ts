import { useMutation } from "@tanstack/react-query";
import { sessionsApi } from "@/shared/api";
import type { Session } from "./session";

export interface StartSessionParams {
  courseId: number;
  stepOrder: number;
}

export function useStartSession() {
  return useMutation<Session, unknown, StartSessionParams>({
    mutationFn: async ({ courseId, stepOrder }) => {
      const response = await sessionsApi.start({ courseId, stepOrder });
      return response.data;
    },
  });
}
