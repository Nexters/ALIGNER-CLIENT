import { ROUTES } from "@/shared/config/routes";

export const SCREENING_STEPS = ["analyzing", "body-part"] as const;

export type ScreeningStep = (typeof SCREENING_STEPS)[number];

export function isScreeningStep(value: string | undefined): value is ScreeningStep {
  return (SCREENING_STEPS as readonly string[]).includes(value ?? "");
}

export function screeningStepPath(step: ScreeningStep): string {
  return `${ROUTES.screening}?step=${step}`;
}
