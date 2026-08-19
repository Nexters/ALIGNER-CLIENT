import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import type { Member } from "@/entities/member";
import type { ExperienceLevel } from "@/features/onboarding-form";
import { profileEditSchema, type ProfileEditFormValues } from "./schema";
import { toProfileEditFormValues } from "./to-form-values";

const WATCHED_FIELDS = ["nickname", "experienceLevel", "heightCm", "weightKg"] as const;

export function useProfileEditForm(member: Member) {
  const {
    control,
    setValue,
    trigger,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<ProfileEditFormValues>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: toProfileEditFormValues(member),
    mode: "onBlur",
  });

  const [nickname, experienceLevel, heightCm, weightKg] = useWatch({
    control,
    name: WATCHED_FIELDS,
  });

  // blur로 한 번 에러가 뜬 뒤에는 고칠 때마다 바로 재검증해서 에러가 즉시 사라지게 한다
  const updateNickname = (value: string) =>
    setValue("nickname", value, { shouldDirty: true, shouldValidate: Boolean(errors.nickname) });

  const updateExperienceLevel = (value: ExperienceLevel) =>
    setValue("experienceLevel", value, { shouldDirty: true });

  const updateHeight = (value: string) =>
    setValue("heightCm", value, { shouldDirty: true, shouldValidate: Boolean(errors.heightCm) });

  const updateWeight = (value: string) =>
    setValue("weightKg", value, { shouldDirty: true, shouldValidate: Boolean(errors.weightKg) });

  const validateNickname = () => trigger("nickname");
  const validateHeight = () => trigger("heightCm");
  const validateWeight = () => trigger("weightKg");

  // 저장 성공 직후 서버가 돌려준 값으로 dirty 기준선을 다시 잡는다 — 그래야 저장 버튼이 다시 disabled로 돌아온다
  const resetToMember = (updated: Member) => reset(toProfileEditFormValues(updated));

  return {
    values: { nickname, experienceLevel, heightCm, weightKg },
    errors: {
      nickname: errors.nickname?.message,
      heightCm: errors.heightCm?.message,
      weightKg: errors.weightKg?.message,
    },
    handlers: { updateNickname, updateExperienceLevel, updateHeight, updateWeight },
    validateNickname,
    validateHeight,
    validateWeight,
    isDirty,
    isValid,
    handleSubmit,
    resetToMember,
  };
}
