import { cn } from "@/shared/lib/cn";
import { FALLBACK_POSE_IMAGE, type TodayWorkoutSummary } from "@/entities/course";
import { CroppedWorkoutImage } from "@/shared/ui/cropped-workout-image";
import { AlarmIcon, FireIcon, HumanIcon, RightArrowIcon } from "@/shared/ui/icons";
import { SummaryCard, type SummaryCardChip } from "@/shared/ui/summary-card";

// 완료 여부에 따라 CTA 문구만 바뀌고 이동할 곳(데일리 루틴)은 동일하다.
const CTA_LABEL = {
  incomplete: "오늘 운동 시작하기",
  completed: "내일 운동 미리보기",
} as const;

export interface TodayCourseCardProps {
  /** 진행 중인 코스가 없으면 null. UI 구조는 그대로 두고 수치·이미지만 "-"/폴백으로 표기한다 */
  workout: TodayWorkoutSummary | null;
  /** 오늘 이 코스를 완주했는지. 서버 응답의 completed 값을 그대로 전달한다 */
  isCompleted: boolean;
  onStart?: () => void;
  className?: string;
}

export default function TodayCourseCard({
  workout,
  isCompleted,
  onStart,
  className,
}: TodayCourseCardProps) {
  const chips: SummaryCardChip[] = [
    { icon: <HumanIcon />, label: `${workout?.exerciseCount ?? "-"}개 운동` },
    { icon: <AlarmIcon />, label: `${workout?.setCount ?? "-"}개 세트` },
    { icon: <FireIcon />, label: `${workout?.kcal ?? "-"}kcal` },
  ];
  const ctaLabel = isCompleted ? CTA_LABEL.completed : CTA_LABEL.incomplete;

  return (
    <div
      className={cn(
        "relative h-[33rem] w-full overflow-hidden rounded-[4rem] bg-gray-97",
        className,
      )}
    >
      <CroppedWorkoutImage src={workout?.imageSrc ?? FALLBACK_POSE_IMAGE} />
      <SummaryCard
        minutes={workout?.minutes ?? null}
        chips={chips}
        isCompleted={isCompleted}
        className="absolute inset-0 size-full"
        footer={
          <button
            type="button"
            onClick={onStart}
            className="group flex w-full items-center justify-between rounded-[10rem] bg-tertiary-950 py-[0.8rem] pr-[0.8rem] pl-[2.8rem]"
          >
            <span className="typo-subheadline-regular text-gray-96 group-hover:text-gray-40 group-active:text-gray-40">
              {ctaLabel}
            </span>
            <span className="flex items-center justify-center rounded-full bg-tertiary-100 p-[0.3rem] group-hover:bg-gray-40 group-active:bg-gray-40">
              <RightArrowIcon className="size-[3.2rem] text-gray-10" />
            </span>
          </button>
        }
      />
    </div>
  );
}
