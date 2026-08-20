import { useNavigate } from "react-router";
import { OnboardingForm } from "@/features/onboarding-form";
import { ROUTES } from "@/shared/config/routes";

export function OnboardingPage() {
  const navigate = useNavigate();

  return <OnboardingForm onComplete={() => navigate(ROUTES.screening)} />;
}
