import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { CTAButton } from "@/shared/ui/button";
import { AlarmIcon, ChevronUpIcon, FireIcon, HumanIcon } from "@/shared/ui/icons";
import { SequenceItem } from "@/shared/ui/sequence-item";
import { SummaryCard } from "@/shared/ui/summary-card";
import { TopNavBar } from "@/shared/ui/top-nav-bar";
import { useCourseIntroTransition } from "../model/use-course-intro-transition";
import type { Course } from "../model/types";

const EASE_OUT = "ease-[cubic-bezier(0.16,1,0.3,1)]";
const EASE_SOFT = "ease-[cubic-bezier(0.22,1,0.36,1)]";

// 되감기 없이 한 방향으로만 진행하는 화면이라 스크롤 잠금 해제만 별도 지연을 둔다 —
// open 전환 도중에 스크롤이 끼어들면 카드가 올라오는 맛이 깨진다
const SCROLLABLE_DELAY_MS = 1000;
// 스와이프로 조기 전환하는 기준 거리(px)
const SWIPE_THRESHOLD_PX = 24;
// 휠로 조기 전환하는 기준 deltaY
const WHEEL_THRESHOLD = 8;

type CourseRecommendationProps = {
  course: Course;
  heroImageSrc?: string;
  onBack: () => void;
  onStart?: () => void;
};

export function CourseRecommendation({
  course,
  heroImageSrc,
  onBack,
  onStart,
}: CourseRecommendationProps) {
  const { phase, open } = useCourseIntroTransition();
  const isOpen = phase === "open";
  const [scrollable, setScrollable] = useState(false);
  const touchYRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => setScrollable(true), SCROLLABLE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleTouchStart = (event: React.TouchEvent) => {
    if (!isOpen) touchYRef.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: React.TouchEvent) => {
    if (isOpen || touchYRef.current === null) return;
    if (touchYRef.current - event.touches[0].clientY > SWIPE_THRESHOLD_PX) {
      touchYRef.current = null;
      open();
    }
  };

  const handleWheel = (event: React.WheelEvent) => {
    if (!isOpen && event.deltaY > WHEEL_THRESHOLD) open();
  };

  const minutes =
    course.estimatedDurationSeconds != null ? Math.round(course.estimatedDurationSeconds / 60) : 0;
  const warmupStepCount = Math.max(course.totalStepCount - 1, 0);

  const chips = [
    { icon: <HumanIcon />, label: `${course.exerciseCount}개 운동` },
    { icon: <AlarmIcon />, label: `${course.totalSetCount}개 세트` },
    {
      icon: <FireIcon />,
      label: course.estimatedKcal != null ? `${course.estimatedKcal}kcal` : "-",
    },
  ];

  return (
    <main
      className="relative flex h-screen w-full flex-col overflow-hidden bg-tertiary-50 px-[2rem]"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <TopNavBar onBack={onBack} className="mt-[3.6rem] shrink-0" />

      <div
        className={cn(
          "flex-1 pt-[3.6rem]",
          scrollable ? "overflow-y-auto pb-[12rem]" : "overflow-hidden",
        )}
      >
        <div
          className={cn(
            "flex w-[26.8rem] flex-col gap-[1.6rem] opacity-0 transition-[opacity,transform] duration-[580ms]",
            EASE_SOFT,
            phase !== "intro" && "translate-y-0 opacity-100",
            phase === "intro" && "translate-y-[1.4rem]",
          )}
        >
          <h1 className="text-[2.4rem] leading-[1.4] font-bold tracking-[-0.0062rem] text-gray-10">
            오늘은 {course.totalStepCount}단계로 구성된
            <br />
            {course.targetPoseName} 코스를 추천드려요
          </h1>
          <p className="text-[1.6rem] leading-[1.4] font-medium tracking-[-0.0031rem] text-gray-50">
            웜업자세 {warmupStepCount}개+{course.targetPoseName} | {minutes}분
          </p>
        </div>

        <div
          className={cn(
            "relative mt-[3.2rem] h-[30rem] w-[33.5rem] translate-y-[52rem] transition-transform duration-[920ms]",
            EASE_OUT,
            phase !== "intro" && "translate-y-[4.9rem]",
            isOpen && "translate-y-0 duration-[680ms]",
          )}
        >
          <span
            aria-hidden="true"
            className={cn(
              "absolute top-[-4.9rem] left-1/2 z-[1] ml-[-12.755rem] h-[19.187rem] w-[25.5rem] origin-center rounded-[3.2rem] bg-tertiary-200 transition-[transform,opacity] duration-[920ms] delay-[60ms]",
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
              "absolute top-[-2.938rem] left-1/2 z-[2] ml-[-14.932rem] h-[25.7rem] w-[29.8rem] origin-center rounded-[3.6rem] bg-gray-20 transition-[transform,opacity] duration-[920ms] delay-[30ms]",
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
                alt={course.targetPoseName}
                className="absolute inset-0 size-full rounded-[4rem] object-cover object-bottom"
              />
            )}
            <SummaryCard minutes={minutes} chips={chips} className="absolute inset-0" />
          </div>

          <button
            type="button"
            onClick={open}
            className={cn(
              "absolute inset-x-0 top-full z-20 mx-auto mt-[3.4rem] flex w-[23.2rem] flex-col items-center gap-1 opacity-0 transition-[opacity,transform] duration-[450ms]",
              EASE_SOFT,
              phase !== "intro" && !isOpen && "translate-y-0 opacity-100 delay-[580ms]",
              phase === "intro" && "translate-y-[0.8rem]",
              isOpen &&
                "-translate-y-[1rem] pointer-events-none opacity-0 duration-[320ms] delay-0",
            )}
          >
            <ChevronUpIcon className="size-[1.1rem] text-gray-60" />
            <span className="text-[1.2rem] leading-[1.4] whitespace-nowrap text-gray-60">
              위로 가볍게 스와이프 시 코스 순서를 볼 수 있어요
            </span>
          </button>
        </div>

        <ol className="mt-[2.4rem] flex flex-col gap-3">
          {course.steps.map((step, index) => {
            const exercise = step.exercises[0];
            const isKeyStep = index === course.steps.length - 1;
            return (
              <li
                key={step.stepOrder}
                className={cn(
                  "translate-y-[3rem] scale-[0.97] opacity-0 transition-[opacity,transform] duration-[660ms]",
                  EASE_OUT,
                  isOpen && "translate-y-0 scale-100 opacity-100",
                )}
                style={isOpen ? { transitionDelay: `${140 + index * 55}ms` } : undefined}
              >
                <SequenceItem
                  compact
                  step={step.stepOrder}
                  active={isKeyStep}
                  imageSrc={exercise?.imageAssetKey ?? undefined}
                  alt={exercise?.name ?? ""}
                  title={exercise?.name ?? ""}
                  descriptions={exercise?.category ? [exercise.category] : undefined}
                />
              </li>
            );
          })}
        </ol>
      </div>

      <CTAButton
        fixed
        className={cn(
          "bg-tertiary-50 pb-[5rem] opacity-0 transition-[opacity,transform] duration-[680ms]",
          EASE_OUT,
          "pointer-events-none translate-y-full",
          isOpen && "pointer-events-auto translate-y-0 opacity-100 delay-[460ms]",
        )}
      >
        <CTAButton.Single onClick={onStart}>오늘 코스 시작하기</CTAButton.Single>
      </CTAButton>
    </main>
  );
}
