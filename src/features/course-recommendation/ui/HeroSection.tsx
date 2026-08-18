import { cn } from "@/shared/lib/cn";
import { AlarmIcon, ChevronUpIcon, FireIcon, HumanIcon } from "@/shared/ui/icons";
import { SummaryCard } from "@/shared/ui/summary-card";
import type { CourseIntroPhase } from "../model/use-course-intro-transition";
import { EASE_OUT, EASE_SOFT } from "./animation";

type HeroSectionProps = {
  phase: CourseIntroPhase;
  isOpen: boolean;
  heroImageSrc?: string;
  targetPoseName: string;
  minutes: number;
  exerciseCount: number;
  totalSetCount: number;
  estimatedKcal: number | null;
  onHintClick: () => void;
};

export function HeroSection({
  phase,
  isOpen,
  heroImageSrc,
  targetPoseName,
  minutes,
  exerciseCount,
  totalSetCount,
  estimatedKcal,
  onHintClick,
}: HeroSectionProps) {
  const CHIPS = [
    { icon: <HumanIcon />, label: `${exerciseCount}개 운동` },
    { icon: <AlarmIcon />, label: `${totalSetCount}개 세트` },
    { icon: <FireIcon />, label: estimatedKcal != null ? `${estimatedKcal}kcal` : "-" },
  ];

  return (
    <div
      className={cn(
        "relative mt-[3.2rem] aspect-[67/60] w-full translate-y-[52rem] transition-transform duration-[920ms]",
        EASE_OUT,
        phase !== "intro" && "translate-y-[4.9rem]",
        isOpen && "translate-y-0 duration-[680ms]",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-[-16.33%] left-1/2 z-[1] h-[63.96%] w-[76.12%] -translate-x-1/2 rounded-[3.2rem] bg-tertiary-200 transition-[transform,opacity] duration-[920ms] delay-[60ms]",
          EASE_OUT,
          "translate-y-[3.4rem] rotate-0",
          phase !== "intro" && "translate-y-0 rotate-[3.48deg]",
          isOpen &&
            "translate-y-[2.2rem] rotate-[1deg] scale-[0.96] opacity-0 duration-[550ms] delay-0",
        )}
      />
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-[-9.79%] left-1/2 z-[2] h-[85.67%] w-[88.96%] -translate-x-1/2 rounded-[3.6rem] bg-gray-20 transition-[transform,opacity] duration-[920ms] delay-[30ms]",
          EASE_OUT,
          "translate-y-[2.6rem] rotate-0",
          phase !== "intro" && "translate-y-0 rotate-[-2.84deg]",
          isOpen &&
            "translate-y-[1.8rem] rotate-[-1deg] scale-[0.97] opacity-0 duration-[380ms] delay-0",
        )}
      />

      <div className="relative z-[3] size-full">
        {heroImageSrc && (
          <img
            src={heroImageSrc}
            alt={targetPoseName}
            className="absolute inset-0 size-full rounded-[4rem] object-cover object-bottom"
          />
        )}
        <SummaryCard minutes={minutes} chips={CHIPS} className="absolute inset-0" />
      </div>

      <button
        type="button"
        onClick={onHintClick}
        className={cn(
          "absolute inset-x-0 top-full mt-[1.6rem] z-20 flex flex-col items-center gap-[0.4rem] opacity-0 transition-[opacity,transform] duration-[450ms]",
          EASE_SOFT,
          phase !== "intro" && !isOpen && "translate-y-0 opacity-100 delay-[580ms]",
          phase === "intro" && "translate-y-[0.8rem]",
          isOpen && "-translate-y-[1rem] pointer-events-none opacity-0 duration-[320ms] delay-0",
        )}
      >
        <ChevronUpIcon className="size-[1.1rem] text-gray-60" />
        <span className="typo-caption-1-regular text-gray-60">
          위로 가볍게 스와이프 시 코스 순서를 볼 수 있어요
        </span>
      </button>
    </div>
  );
}
