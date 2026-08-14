import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { useOnboardingForm } from "../model/use-onboarding-form";
import { MIN_MAX_FIELDS } from "../constants/form-fields";
import ErrorMessage from "./ErrorMessage";
import PoseGrid from "./PoseGrid";

type StepLayoutRootProps = {
  title?: string;
  className?: string;
  children: React.ReactNode;
};

function StepLayoutRoot({ title, className, children }: StepLayoutRootProps) {
  return (
    <div
      className={cn(
        "flex w-full h-full flex-col gap-[3.2rem] mt-[3.2rem] typo-title-2-5-emphasized",
        className,
      )}
    >
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
  const [hasEntered, setHasEntered] = useState(false);
  const {
    compatibleErrors,
    compatibleHandlers: { getPostureSelection, updateEasyPose, updateHardPose },
  } = useOnboardingForm();
  const { selectedIds, excludedIds } = getPostureSelection(field);
  const onToggle = field === "easyPoseIds" ? updateEasyPose : updateHardPose;
  const error = compatibleErrors[field];

  // 마운트 시점엔 화면 오른쪽 바깥에 두고, 다음 프레임에 0으로 옮겨서 슬라이드 인 되게 한다
  useEffect(() => {
    const frame = requestAnimationFrame(() => setHasEntered(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <StepLayoutRoot
      className={cn(
        "transition-transform duration-500 ease-out",
        !hasEntered && "translate-x-full",
      )}
    >
      <div className="flex items-end justify-between">
        <h1 className="typo-title-emphasized whitespace-pre-line">{title}</h1>
        <span className="text-end typo-subheadline-regular text-gray-70">
          {selectedIds?.length ?? 0}/{MIN_MAX_FIELDS.poses.max}
        </span>
      </div>
      <PoseGrid selectedIds={selectedIds ?? []} excludedIds={excludedIds} onToggle={onToggle} />
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
