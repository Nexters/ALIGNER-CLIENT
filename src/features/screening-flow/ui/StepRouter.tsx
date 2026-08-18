import { Navigate } from "react-router";
import { useScreeningStepParam } from "../hooks/useScreeningStepParam";
import { isScreeningStep, screeningStepPath } from "../model/screening-steps";
import BodyPartLevelStep from "../steps/BodyPartLevelStep";
import DiagnosisStep from "../steps/DiagnosisStep";

const STEP_COMPONENTS = {
  analyzing: DiagnosisStep,
  "body-part": BodyPartLevelStep,
} as const;

export function StepRouter() {
  const step = useScreeningStepParam();

  if (!isScreeningStep(step)) {
    return <Navigate to={screeningStepPath("analyzing")} replace />;
  }

  const StepComponent = STEP_COMPONENTS[step];
  return <StepComponent />;
}
