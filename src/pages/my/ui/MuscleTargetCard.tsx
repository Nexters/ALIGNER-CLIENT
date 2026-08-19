import { useNavigate } from "react-router";
import { useMemberProfile } from "@/entities/member";
import {
  BODY_PART_MARKER_POSITION,
  BODY_PART_NAMES,
  LEVEL_OPTIONS,
  screeningStepPath,
} from "@/features/screening-flow";
import { cn } from "@/shared/lib/cn";
import { MannequinScanIcon } from "@/shared/ui/icons";
import {
  RADIO_BASE,
  RADIO_INDICATOR_SELECTED_BG,
  RADIO_INDICATOR_SHAPE,
  RADIO_SHAPE,
} from "@/shared/ui/radio";

export function MuscleTargetCard() {
  const navigate = useNavigate();
  const { data: member } = useMemberProfile();
  const bodyPartCode = member?.reinforcementBodyPartCode;
  const difficultyLabel = LEVEL_OPTIONS.find(
    (option) => option.level === member?.reinforcementLevel,
  )?.label;

  const goToScreening = () => navigate(screeningStepPath("analyzing"));

  if (!bodyPartCode || !difficultyLabel) {
    return (
      <div className="relative flex h-[252px] w-full flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-b from-primary-50 from-15% to-primary-200 p-6 shadow-[inset_0_0_8px_4px_var(--color-gray-98)]">
        <p className="typo-title-3-emphasized text-gray-40">
          아직 강화 부위를
          <br />
          선택하지 않았어요
        </p>
        <button
          type="button"
          onClick={goToScreening}
          className="typo-body-emphasized w-fit rounded-[8px] bg-tertiary-700 px-4 py-3 text-primary-200"
        >
          부위 선택하기
        </button>
      </div>
    );
  }

  const markerPosition = BODY_PART_MARKER_POSITION[bodyPartCode];

  return (
    <div className="relative flex h-[252px] w-full overflow-hidden rounded-[24px] bg-gradient-to-b from-primary-50 from-15% to-primary-200 shadow-[inset_0_0_8px_4px_var(--color-gray-98)]">
      <div className="flex flex-col justify-between p-6">
        <p className="relative z-10 typo-title-3-emphasized text-gray-40">
          <span className="text-tertiary-600">{BODY_PART_NAMES[bodyPartCode]}근육</span>을{" "}
          <span className="text-tertiary-600">{difficultyLabel}</span>로
          <br />
          강화하고 있어요
        </p>

        <button
          type="button"
          onClick={goToScreening}
          className="typo-body-emphasized relative z-10 w-fit rounded-[8px] bg-tertiary-700 px-4 py-3 text-primary-200"
        >
          난이도 조정하기
        </button>
      </div>

      {/*
        실루엣(MannequinScanIcon)과 마커 위치(BODY_PART_MARKER_POSITION)는 screening-flow와
        같은 것을 재사용한다.
        screening의 Mannequin과 동일한 좌표계를 공유한다.
      */}
      <div aria-hidden="true" className="relative flex-1">
        <div className="pointer-events-none absolute top-[13px] left-1/2 h-[442px] -translate-x-1/2">
          <MannequinScanIcon className="h-full w-auto" />
          <div
            style={markerPosition}
            className={cn(RADIO_BASE, RADIO_SHAPE, "absolute -translate-x-1/2 -translate-y-1/2")}
          >
            <div className={cn(RADIO_INDICATOR_SHAPE, RADIO_INDICATOR_SELECTED_BG)} />
          </div>
        </div>
      </div>
    </div>
  );
}
