import { createStepPath, ROUTES } from "@/shared/config/routes";
import { onboardingFormSchema, type OnboardingFormValues } from "./schema";

export const ONBOARDING_STEPS = [
  "experience-level",
  "height-weight",
  "usual-posture",
  "difficult-posture",
] as const;

export type OnboardingStep = (typeof ONBOARDING_STEPS)[number];

export function isOnboardingStep(value: string | undefined): value is OnboardingStep {
  return (ONBOARDING_STEPS as readonly string[]).includes(value ?? "");
}

export const onboardingStepPath = createStepPath<OnboardingStep>(ROUTES.onboarding);

export function getNextStep(current: OnboardingStep): OnboardingStep | undefined {
  return ONBOARDING_STEPS[ONBOARDING_STEPS.indexOf(current) + 1];
}

// "다음"을 누르기 전에 검증해야 하는 폼 필드
export const STEP_FIELDS: Record<OnboardingStep, (keyof OnboardingFormValues)[]> = {
  "height-weight": ["heightCm", "weightKg"],
  "experience-level": ["experienceLevel"],
  "usual-posture": ["easyPoseIds"],
  "difficult-posture": ["hardPoseIds"],
};

// formState.errors는 아직 방문하지 않은 스텝은 검증된 적이 없어 항상 비어있다 — 스킵 여부 판단은 스키마로 직접 값을 확인해야 한다
export function isStepComplete(step: OnboardingStep, formData: OnboardingFormValues): boolean {
  return STEP_FIELDS[step].every(
    (field) => onboardingFormSchema.shape[field].safeParse(formData[field]).success,
  );
}

// 앞쪽 스텝 중 아직 완료되지 않은 첫 스텝을 찾는다 — 없으면 지금까지는 순서대로 다 채운 것
export function findFirstIncompleteStep(
  formData: OnboardingFormValues,
): OnboardingStep | undefined {
  return ONBOARDING_STEPS.find((step) => !isStepComplete(step, formData));
}
