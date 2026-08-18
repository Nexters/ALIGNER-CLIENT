import type { ComponentType } from "react";
import type { OnboardingStep } from "../model/onboarding-steps";
import DifficultPostureStep from "../steps/DifficultPostureStep";
import ExperienceLevelStep from "../steps/ExperienceLevelStep";
import HeightWeightStep from "../steps/HeightWeightStep";
import UsualPostureStep from "../steps/UsualPostureStep";

export const STEP_COMPONENTS: Record<OnboardingStep, ComponentType> = {
  "height-weight": HeightWeightStep,
  "experience-level": ExperienceLevelStep,
  "usual-posture": UsualPostureStep,
  "difficult-posture": DifficultPostureStep,
};
