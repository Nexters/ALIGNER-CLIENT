import {
  BODY_PART_MARKER_POSITION,
  BODY_PART_NAMES,
  type BodyPartCode,
} from "@/features/screening-flow";
import { cn } from "@/shared/lib/cn";
import { MannequinScanIcon } from "@/shared/ui/icons";
import {
  RADIO_BASE,
  RADIO_INDICATOR_SELECTED_BG,
  RADIO_INDICATOR_SHAPE,
  RADIO_SHAPE,
} from "@/shared/ui/radio";

// TODO: 실제 근육 타겟/난이도 API 연동 전까지의 목데이터
const MOCK_BODY_PART: BodyPartCode = "BACK";
const MOCK_DIFFICULTY = "난이도 하";

export function MuscleTargetCard() {
  const markerPosition = BODY_PART_MARKER_POSITION[MOCK_BODY_PART];

  return (
    <div className="relative flex h-[252px] w-full overflow-hidden rounded-[24px] bg-gradient-to-b from-primary-50 from-15% to-primary-200 shadow-[inset_0_0_8px_4px_var(--color-gray-98)]">
      <div className="flex flex-col justify-between p-6">
        <p className="relative z-10 typo-title-3-emphasized text-gray-40">
          <span className="text-tertiary-600">{BODY_PART_NAMES[MOCK_BODY_PART]}근육</span>을{" "}
          <span className="text-tertiary-600">{MOCK_DIFFICULTY}</span>로
          <br />
          강화하고 있어요
        </p>

        {/* TODO: 난이도 설정(스크리닝) 플로우로 이동 */}
        <button
          type="button"
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
