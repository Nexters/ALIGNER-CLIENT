import { ErrorMessage } from "@/shared/ui/error-message";
import { NumberField } from "@/shared/ui/number-field";
import { useOnboardingForm } from "../model/use-onboarding-form";
import StepLayout from "../components/StepLayout";

export default function HeightWeightStep() {
  const {
    compatibleFormData: { heightCm, weightKg },
    compatibleErrors,
    compatibleHandlers: { updateHeight, updateWeight },
    trigger,
  } = useOnboardingForm();

  return (
    <StepLayout title="키와 몸무게를 알려주세요">
      <div className="flex items-center gap-[1.2rem] w-full">
        <div className="flex flex-col gap-[0.4rem] w-full">
          <span className="text-gray-500 typo-subheadline-regular">키</span>
          <NumberField
            placeholder="160"
            suffix="cm"
            value={heightCm?.toString() ?? ""}
            onValueChange={updateHeight}
            onBlur={() => trigger("heightCm")}
            error={Boolean(compatibleErrors.heightCm)}
          />
        </div>
        <div className="flex flex-col gap-[0.4rem] w-full">
          <span className="text-gray-500 typo-subheadline-regular">몸무게</span>
          <NumberField
            placeholder="60"
            suffix="kg"
            value={weightKg?.toString() ?? ""}
            onValueChange={updateWeight}
            onBlur={() => trigger("weightKg")}
            error={Boolean(compatibleErrors.weightKg)}
          />
        </div>
      </div>
      {compatibleErrors.heightCm && <ErrorMessage message={compatibleErrors.heightCm} />}
      {compatibleErrors.weightKg && <ErrorMessage message={compatibleErrors.weightKg} />}
    </StepLayout>
  );
}
