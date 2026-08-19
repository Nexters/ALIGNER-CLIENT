import { useMutation } from "@tanstack/react-query";
import { useFormContext, useWatch } from "react-hook-form";
import { useUpdateMemberProfile } from "@/entities/member";
import { parseApiError, screeningApi } from "@/shared/api";
import type { ScreeningAnswerRequest } from "@/shared/api/generated/data-contracts";
import type { OnboardingFormValues } from "./schema";
import { ERROR_MESSAGES, EXPERIENCE_LEVELS, MIN_MAX_FIELDS } from "../constants/form-fields";

function toScreeningAnswers(
  poseIds: number[],
  perceivedDifficulty: ScreeningAnswerRequest["perceivedDifficulty"],
): ScreeningAnswerRequest[] {
  return poseIds.map((targetPoseId) => ({ targetPoseId, perceivedDifficulty }));
}

export function useOnboardingForm() {
  const {
    control,
    setValue,
    setError,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useFormContext<OnboardingFormValues>();

  const updateMemberProfile = useUpdateMemberProfile();
  const submitScreening = useMutation({
    mutationFn: (answers: ScreeningAnswerRequest[]) => screeningApi.submit({ answers }),
  });

  const [heightCm, weightKg, experienceLevel, easyPoseIds, hardPoseIds] = useWatch({
    control,
    name: ["heightCm", "weightKg", "experienceLevel", "easyPoseIds", "hardPoseIds"],
  });

  // 3자리를 넘는 입력은 애초에 반영하지 않는다
  const updateHeight = (value: string) => {
    if (value.length > 3) return;
    setValue("heightCm", Number(value), { shouldValidate: true });
  };

  const updateWeight = (value: string) => {
    if (value.length > 3) return;
    setValue("weightKg", Number(value), { shouldValidate: true });
  };

  const updateExperienceLevel = (value: (typeof EXPERIENCE_LEVELS)[number]) => {
    setValue("experienceLevel", value, { shouldValidate: true });
  };

  const getPostureSelection = (field: string) => {
    const isEasy = field === "easyPoseIds";
    return {
      selectedIds: isEasy ? easyPoseIds : hardPoseIds,
      excludedIds: isEasy ? hardPoseIds : easyPoseIds,
    };
  };

  const updateEasyPose = (poseId: number, isSelected: boolean) => {
    if (isSelected) {
      setValue(
        "easyPoseIds",
        easyPoseIds.filter((id) => id !== poseId),
        { shouldValidate: true },
      );
      return;
    }
    if (easyPoseIds.length >= MIN_MAX_FIELDS.poses.max) {
      setError("easyPoseIds", { message: ERROR_MESSAGES.poses.max });
      return;
    }

    setValue("easyPoseIds", [...easyPoseIds, poseId], { shouldValidate: true });
  };

  const updateHardPose = (poseId: number, isSelected: boolean) => {
    if (isSelected) {
      setValue(
        "hardPoseIds",
        hardPoseIds.filter((id) => id !== poseId),
        { shouldValidate: true },
      );
      return;
    }
    if (hardPoseIds.length >= MIN_MAX_FIELDS.poses.max) {
      setError("hardPoseIds", { message: ERROR_MESSAGES.poses.max });
      return;
    }

    setValue("hardPoseIds", [...hardPoseIds, poseId], { shouldValidate: true });
  };

  const handleSubmitForm = async (onSuccess: (data: OnboardingFormValues) => void) => {
    await handleSubmit(async (data) => {
      try {
        await Promise.all([
          updateMemberProfile.mutateAsync({
            heightCm: data.heightCm,
            weightKg: data.weightKg,
            experienceLevel: data.experienceLevel,
          }),
          submitScreening.mutateAsync([
            ...toScreeningAnswers(data.easyPoseIds, "EASY"),
            ...toScreeningAnswers(data.hardPoseIds, "HARD"),
          ]),
        ]);
        onSuccess(data);
      } catch {
        // 에러 메시지는 updateMemberProfile.error / submitScreening.error로 노출된다
      }
    })();
  };

  const compatibleFormData = {
    heightCm,
    weightKg,
    experienceLevel,
    easyPoseIds,
    hardPoseIds,
  };

  const compatibleErrors = {
    heightCm: errors.heightCm?.message,
    weightKg: errors.weightKg?.message,
    experienceLevel: errors.experienceLevel?.message,
    easyPoseIds: errors.easyPoseIds?.message,
    hardPoseIds: errors.hardPoseIds?.message,
  };

  const compatibleHandlers = {
    updateHeight,
    updateWeight,
    updateExperienceLevel,
    getPostureSelection,
    updateEasyPose,
    updateHardPose,
    handleSubmitForm,
  };

  const submitError = updateMemberProfile.isError
    ? (parseApiError(updateMemberProfile.error)?.message ?? "프로필 저장에 실패했습니다.")
    : submitScreening.isError
      ? (parseApiError(submitScreening.error)?.message ?? "진단 제출에 실패했습니다.")
      : undefined;

  return {
    compatibleFormData,
    compatibleErrors,
    compatibleHandlers,
    trigger,
    isSubmitting: updateMemberProfile.isPending || submitScreening.isPending,
    submitError,
  };
}
