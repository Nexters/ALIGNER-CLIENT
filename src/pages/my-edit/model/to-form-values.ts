import type { Member } from "@/entities/member";
import type { ProfileEditFormValues } from "./schema";

export function toProfileEditFormValues(member: Member): ProfileEditFormValues {
  return {
    nickname: member.nickname ?? "",
    experienceLevel: member.experienceLevel ?? "UNDER_ONE_YEAR",
    heightCm: member.heightCm != null ? String(member.heightCm) : "",
    weightKg: member.weightKg != null ? String(member.weightKg) : "",
  };
}
