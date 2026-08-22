import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { CTAButton } from "@/shared/ui/button";
import { TopNavBar } from "@/shared/ui/top-nav-bar";
import { useCourseIntroTransition } from "../model/use-course-intro-transition";
import type { Course } from "@/entities/course";
import { EASE_OUT } from "./animation";
import { HeroSection } from "./HeroSection";
import { StepList } from "./StepList";
import { TitleBlock } from "./TitleBlock";

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

  return (
    <main
      className="relative flex h-screen w-full flex-col overflow-hidden bg-tertiary-50 px-[2rem]"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <TopNavBar onBack={onBack} className="mt-[3.6rem]" />

      <div
        className={cn(
          "scrollbar-hide flex-1 pt-[3.6rem]",
          scrollable ? "overflow-y-auto pb-[12rem]" : "overflow-hidden",
        )}
      >
        <TitleBlock
          phase={phase}
          targetPoseName={course.targetPoseName}
          totalStepCount={course.totalStepCount}
          warmupStepCount={warmupStepCount}
          minutes={minutes}
        />

        <HeroSection
          phase={phase}
          isOpen={isOpen}
          heroImageSrc={heroImageSrc}
          targetPoseName={course.targetPoseName}
          minutes={minutes}
          exerciseCount={course.exerciseCount}
          totalSetCount={course.totalSetCount}
          estimatedKcal={course.estimatedKcal}
          onHintClick={open}
        />

        <StepList steps={course.steps} isOpen={isOpen} />
      </div>

      <CTAButton
        fixed
        className={cn(
          "bg-tertiary-50 opacity-0 transition-[opacity,transform] duration-[680ms]",
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
