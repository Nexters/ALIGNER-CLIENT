import { cn } from "@/shared/lib/cn";
import type { CourseIntroPhase } from "../model/use-course-intro-transition";
import { EASE_SOFT } from "./animation";

type TitleBlockProps = {
  phase: CourseIntroPhase;
  targetPoseName: string;
  totalStepCount: number;
  warmupStepCount: number;
  minutes: number;
};

export function TitleBlock({
  phase,
  targetPoseName,
  totalStepCount,
  warmupStepCount,
  minutes,
}: TitleBlockProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-[1.6rem] opacity-0 transition-[opacity,transform] duration-[580ms]",
        EASE_SOFT,
        phase !== "intro" && "translate-y-0 opacity-100",
        phase === "intro" && "translate-y-[1.4rem]",
      )}
    >
      <h1 className="typo-title-2-5-emphasized text-gray-10">
        오늘은 {totalStepCount}단계로 구성된
        <br />
        {targetPoseName} 코스를 추천드려요
      </h1>
      <p className="typo-body-regular text-gray-50">
        웜업자세 {warmupStepCount}개+{targetPoseName} | {minutes}분
      </p>
    </div>
  );
}
