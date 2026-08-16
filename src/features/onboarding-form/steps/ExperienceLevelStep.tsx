import { Button } from "@/shared/ui/button";
import { EXPERIENCE_LEVEL_OPTIONS } from "../constants/form-fields";
import { useOnboardingForm } from "../model/use-onboarding-form";
import StepLayout from "../components/StepLayout";

export default function ExperienceLevelStep() {
  const {
    compatibleFormData: { experienceLevel },
    compatibleHandlers: { updateExperienceLevel },
  } = useOnboardingForm();

  return (
    <StepLayout title="운동을 하신지 얼마나 됐나요?">
      <div className="flex flex-col gap-[1.2rem]">
        {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
          <Button
            key={option.value}
            color="secondary"
            isSelected={experienceLevel === option.value}
            onClick={() => updateExperienceLevel(option.value)}
            className="py-[2.2rem] px-[4.1rem]"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </StepLayout>
  );
}
