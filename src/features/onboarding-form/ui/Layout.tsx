import { Navigate, useNavigate } from "react-router";
import { CTAButton } from "@/shared/ui/button";
import { useOnboardingStepParam } from "../hooks/useOnboardingParam";
import { useOnboardingForm } from "../model/use-onboarding-form";
import {
  findFirstIncompleteStep,
  getNextStep,
  isOnboardingStep,
  isStepComplete,
  onboardingStepPath,
  ONBOARDING_STEPS,
} from "../model/onboarding-steps";
import { StepRouter } from "./StepRouter";

type LayoutProps = {
  onComplete?: () => void;
};

export function Layout({ onComplete }: LayoutProps) {
  const navigate = useNavigate();
  const stepParam = useOnboardingStepParam();
  const step = isOnboardingStep(stepParam) ? stepParam : ONBOARDING_STEPS[0];
  const {
    compatibleFormData,
    compatibleHandlers: { handleSubmitForm },
  } = useOnboardingForm();

  // 앞 스텝을 채우지 않고 파라미터로 뒤 스텝에 바로 접근한 경우, 아직 안 채운 첫 스텝으로 되돌린다
  const firstIncompleteStep = findFirstIncompleteStep(compatibleFormData);
  if (
    firstIncompleteStep &&
    ONBOARDING_STEPS.indexOf(firstIncompleteStep) < ONBOARDING_STEPS.indexOf(step)
  ) {
    return <Navigate to={onboardingStepPath(firstIncompleteStep)} replace />;
  }

  const nextStep = getNextStep(step);
  const isNextDisabled = !isStepComplete(step, compatibleFormData);

  const handleNext = () => {
    if (nextStep) {
      navigate(onboardingStepPath(nextStep));
      return;
    }
    handleSubmitForm(() => onComplete?.());
  };

  return (
    <main className="overflow-hidden relative flex w-full h-screen flex-col justify-start bg-tertiary-50">
      <nav className="absolute top-0 left-0 right-0 p-4">header</nav>
      <StepRouter />
      <CTAButton fixed>
        <CTAButton.Single onClick={handleNext} disabled={isNextDisabled}>
          다음
        </CTAButton.Single>
      </CTAButton>
    </main>
  );
}
