import type { SessionResponse } from "@/shared/api/generated/data-contracts";

export type Session = SessionResponse;

export function sessionQueryKey(sessionId: number | null) {
  return ["sessions", sessionId] as const;
}
