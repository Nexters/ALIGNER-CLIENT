import { useOnboardingForm } from "../model/use-onboarding-form";
import StepLayout from "../components/StepLayout";
import ExperienceLevelOptions from "../components/ExperienceLevelOptions";

export default function ExperienceLevelStep() {
  const {
    compatibleFormData: { experienceLevel },
    compatibleHandlers: { updateExperienceLevel },
  } = useOnboardingForm();

  return (
    <StepLayout title="운동을 하신지 얼마나 됐나요?">
      <ExperienceLevelOptions value={experienceLevel} onChange={updateExperienceLevel} />
    </StepLayout>
  );
}
