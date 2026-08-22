import type { MemberProfileResponse } from "@/shared/api/generated/data-contracts";

export type Member = MemberProfileResponse;

export const memberQueryKeys = {
  me: ["member", "me"] as const,
};

// heightCm/weightKg/experienceLevel은 온보딩 전이면 null이다 (MemberProfileResponse 참고).
export function hasCompletedOnboarding(member: Member) {
  return member.heightCm != null && member.weightKg != null && member.experienceLevel != null;
}
