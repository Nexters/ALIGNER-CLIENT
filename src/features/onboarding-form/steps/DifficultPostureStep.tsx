import StepLayout from "../components/StepLayout";

export default function DifficultPostureStep() {
  return (
    <StepLayout.Posture title={"특히 어려웠던 자세\n는 어떤 동작이었나요?"} field="hardPoseIds" />
  );
}
