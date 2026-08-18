import type { MemberProfileResponse } from "@/shared/api/generated/data-contracts";

export type Member = MemberProfileResponse;

export const memberQueryKeys = {
  me: ["member", "me"] as const,
};
