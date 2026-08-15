import { cn } from "@/shared/lib/cn";
import type { TodayWorkoutSummary } from "@/entities/course";
import { AlarmIcon, FireIcon, HumanIcon, RightArrowIcon } from "@/shared/ui/icons";
import { SummaryCard, type SummaryCardChip } from "@/shared/ui/summary-card";

// 완료 여부에 따라 CTA 문구만 바뀌고 이동할 곳(데일리 루틴)은 동일하다.
const CTA_LABEL = {
  incomplete: "오늘 운동 시작하기",
  completed: "내일 운동 미리보기",
} as const;

export interface TodayCourseCardProps {
  workout: TodayWorkoutSummary;
  onStart?: () => void;
  className?: string;
}

export default function TodayCourseCard({ workout, onStart, className }: TodayCourseCardProps) {
  const chips: SummaryCardChip[] = [
    { icon: <HumanIcon />, label: `${workout.exerciseCount}개 운동` },
    { icon: <AlarmIcon />, label: `${workout.setCount}개 세트` },
    { icon: <FireIcon />, label: `${workout.kcal}kcal` },
  ];
  const ctaLabel = workout.isCompleted ? CTA_LABEL.completed : CTA_LABEL.incomplete;

  return (
    <div
      className={cn(
        "relative h-[33rem] w-full overflow-hidden rounded-[4rem] bg-gray-97",
        className,
      )}
    >
      <img
        src={workout.imageSrc}
        alt=""
        className="absolute left-1/2 top-1/2 h-[22.41rem] w-[18.27rem] -translate-x-1/2 -translate-y-1/2 object-contain object-bottom"
      />
      <SummaryCard
        minutes={workout.minutes}
        chips={chips}
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
