import { useSearchParams } from "react-router";
import type { OnboardingStep } from "../model/onboarding-steps";

export function useOnboardingStepParam(): OnboardingStep | undefined {
  const [searchParams] = useSearchParams();
  return (searchParams.get("step") ?? undefined) as OnboardingStep | undefined;
}
