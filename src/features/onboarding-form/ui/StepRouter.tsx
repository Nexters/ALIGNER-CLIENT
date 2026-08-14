import { Navigate } from "react-router";
import { useOnboardingStepParam } from "../hooks/useOnboardingParam";
import { isOnboardingStep, ONBOARDING_STEPS, onboardingStepPath } from "../model/onboarding-steps";
import { STEP_COMPONENTS } from "./step-components";

export function StepRouter() {
  const step = useOnboardingStepParam();

  if (!isOnboardingStep(step)) {
    return <Navigate to={onboardingStepPath(ONBOARDING_STEPS[0])} replace />;
  }

  const StepComponent = STEP_COMPONENTS[step];
  return <StepComponent />;
}
