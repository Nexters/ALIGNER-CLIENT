import { ErrorMessage } from "@/shared/ui/error-message";
import { useOnboardingForm } from "../model/use-onboarding-form";
import { useTargetPoses } from "../model/use-target-poses";
import { MIN_MAX_FIELDS } from "../constants/form-fields";
import PoseGrid from "./PoseGrid";

type StepLayoutRootProps = {
  title?: string;
  children: React.ReactNode;
};

function StepLayoutRoot({ title, children }: StepLayoutRootProps) {
  return (
    <div className="flex w-full h-full flex-col gap-[3.2rem] mt-[3.2rem] typo-title-2-5-emphasized">
      {title && <h1 className="typo-title-emphasized whitespace-pre-line">{title}</h1>}
      {children}
    </div>
  );
}

type StepLayoutPostureProps = {
  title: string;
  field: "easyPoseIds" | "hardPoseIds";
};

function StepLayoutPosture({ title, field }: StepLayoutPostureProps) {
  const {
    compatibleErrors,
    compatibleHandlers: { getPostureSelection, updateEasyPose, updateHardPose },
  } = useOnboardingForm();
  const { poses } = useTargetPoses();
  const { selectedIds, excludedIds } = getPostureSelection(field);
  const onToggle = field === "easyPoseIds" ? updateEasyPose : updateHardPose;
  const error = compatibleErrors[field];

  return (
    <StepLayoutRoot>
      <div className="flex items-end justify-between">
        <h1 className="typo-title-emphasized whitespace-pre-line">{title}</h1>
        <span className="text-end typo-subheadline-regular text-gray-70">
          {selectedIds?.length ?? 0}/{MIN_MAX_FIELDS.poses.max}
        </span>
      </div>
      <PoseGrid
        poses={poses}
        selectedIds={selectedIds ?? []}
        excludedIds={excludedIds}
        onToggle={onToggle}
      />
      {error && <ErrorMessage message={error} />}
    </StepLayoutRoot>
  );
}

type StepLayoutComponent = typeof StepLayoutRoot & {
  Posture: typeof StepLayoutPosture;
};

const StepLayout: StepLayoutComponent = Object.assign(StepLayoutRoot, {
  Posture: StepLayoutPosture,
});

export default StepLayout;
