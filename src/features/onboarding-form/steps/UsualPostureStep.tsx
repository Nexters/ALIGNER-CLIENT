import { useEffect, useState } from "react";
import PoseGrid from "../components/PoseGrid";
import StepLayout from "../components/StepLayout";
import { useStepChrome } from "../hooks/useStepChrome";
import { useTargetPoses } from "../model/use-target-poses";

const INTRO_DURATION_MS = 2000;

export default function UsualPostureStep() {
  const [showIntro, setShowIntro] = useState(true);
  const { setIsCTAHidden } = useStepChrome();
  const { poses } = useTargetPoses();

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), INTRO_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsCTAHidden(showIntro);
    return () => setIsCTAHidden(false);
  }, [showIntro, setIsCTAHidden]);

  if (showIntro) {
    return (
      <StepLayout title={"요가에는 아래와 같은\n 다양한 핀포즈들이 있어요"}>
        <PoseGrid poses={poses} selectedIds={[]} />
      </StepLayout>
    );
  }

  return (
    <StepLayout.Posture
      title={"이 중 평소 쉬웠던 자세\n는 어떤 동작이었나요?"}
      field="easyPoseIds"
    />
  );
}
