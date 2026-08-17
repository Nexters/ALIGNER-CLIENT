import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { onboardingFormSchema, type OnboardingFormValues } from "../model/schema";
import { Layout } from "./Layout";

type OnboardingFormProps = {
  onComplete?: () => void;
};

export function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const methods = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: {
      heightCm: undefined,
      weightKg: undefined,
      experienceLevel: undefined,
      easyPoseIds: [],
      hardPoseIds: [],
    },
    mode: "onChange",
  });

  return (
    <FormProvider {...methods}>
      <Layout onComplete={onComplete} />
    </FormProvider>
  );
}
