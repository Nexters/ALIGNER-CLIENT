import type { ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useStartSession } from "@/entities/session";
import { toDailyRoutineExercisePath, toSessionPath } from "@/shared/config/routes";
import { cn } from "@/shared/lib/cn";
import { useInView } from "@/shared/lib/use-in-view";
import { CTAButton } from "@/shared/ui/button";
import { CroppedWorkoutImage } from "@/shared/ui/cropped-workout-image";
import { ErrorMessage } from "@/shared/ui/error-message";
import { AlarmIcon, FireIcon, HumanIcon } from "@/shared/ui/icons";
import { SequenceItem } from "@/shared/ui/sequence-item";
import { Skeleton } from "@/shared/ui/skeleton";
import { SummaryCard, type SummaryCardChip } from "@/shared/ui/summary-card";
import { TopNavBar } from "@/shared/ui/top-nav-bar";
import { useCourse } from "../api/use-course";
import { mapCourseDetailResponse } from "../api/map-course";

/** 코스 순서 줄이 스크롤로 뷰포트에 들어올 때 은은하게 떠오르며 나타난다 */
function RevealOnScroll({ className, children }: { className?: string; children: ReactNode }) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-opacity",
        isInView ? "translate-y-0 opacity-100" : "translate-y-[1.6rem] opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function DailyRoutinePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseIdParam = searchParams.get("courseId");
  const courseId = courseIdParam !== null ? Number(courseIdParam) : null;

  const { data, error, isPending } = useCourse(courseId);
  const startSession = useStartSession();

  if (courseId === null) {
    return null;
  }

  if (isPending) {
    return (
      <main className="relative flex min-h-screen flex-col items-center px-[2rem] pb-[10rem]">
        <TopNavBar
          onBack={() => navigate(-1)}
          className="w-full"
          children={<span className="typo-headline-emphasized text-black">데일리 루틴</span>}
        />
        <Skeleton className="mt-[3rem] h-[2.6rem] w-2/3 rounded-[0.6rem]" />
        <Skeleton className="mt-[2rem] h-[30rem] w-full rounded-[4rem]" />
        <div className="mt-[2.8rem] flex w-full flex-col gap-[1.6rem]">
          <Skeleton className="h-[8rem] w-full rounded-[2rem]" />
          <Skeleton className="h-[8rem] w-full rounded-[2rem]" />
          <Skeleton className="h-[8rem] w-full rounded-[2rem]" />
        </div>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-[2rem]">
        <ErrorMessage
          message="정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
          className="typo-body-regular text-gray-50"
        />
      </main>
    );
  }

  const { courseName, workout, completed, activeIndex, exercises } = mapCourseDetailResponse(data);

  const chips: SummaryCardChip[] = [
    { icon: <HumanIcon />, label: `${workout.exerciseCount}개 운동` },
    { icon: <AlarmIcon />, label: `${workout.setCount}개 세트` },
    { icon: <FireIcon />, label: `${workout.kcal ?? "-"}kcal` },
  ];

  return (
    <main className="relative flex min-h-screen flex-col items-center px-[2rem] pb-[10rem]">
      <TopNavBar
        onBack={() => navigate(-1)}
        className="w-full"
        children={<span className="typo-headline-emphasized text-black">데일리 루틴</span>}
      />

      <h1 className="mt-[3rem] w-full typo-title-2-5-emphasized text-black">{courseName}</h1>

      <div className="relative mt-[2rem] h-[30rem] w-full overflow-hidden rounded-[4rem] bg-gray-97">
        <CroppedWorkoutImage src={workout.imageSrc} />
        <SummaryCard
          minutes={workout.minutes}
          chips={chips}
          isCompleted={completed}
          className="absolute inset-0 size-full h-[30rem]"
        />
      </div>

      <div className="mt-[2.8rem] flex w-full flex-col items-start gap-[2.8rem]">
        <h2 className="typo-title-3-emphasized text-black">코스 순서</h2>
        <div className="flex w-full flex-col items-start">
          {exercises.map((row, index) => (
            <RevealOnScroll key={row.exercise.exerciseId} className="w-full">
              <button
                type="button"
                onClick={() =>
                  navigate(toDailyRoutineExercisePath(String(row.exercise.exerciseId)), {
                    // 상세 API가 느려서, 코스 순서에서 이미 알고 있는 값으로 먼저 그린다.
                    state: {
                      courseId,
                      stepOrder: row.stepOrder,
                      name: row.exercise.name,
                      imageSrc: row.exercise.imageSrc,
                      step: { current: index + 1, total: exercises.length },
                    },
                  })
                }
                className="w-full text-left transition-transform duration-150 ease-out active:scale-[0.98] [@media(hover:hover)_and_(pointer:fine)]:hover:opacity-90"
              >
                <SequenceItem
                  step={index + 1}
                  active={row.active}
                  isLast={index === exercises.length - 1}
                  imageSrc={row.exercise.imageSrc}
                  alt={row.exercise.name}
                  title={row.exercise.name}
                  descriptions={[row.exercise.category, row.exercise.setInfo]}
                  captionIcon={<FireIcon />}
                  caption={`${row.exercise.kcal ?? "-"}kcal`}
                />
              </button>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      <CTAButton>
        <CTAButton.Single
          disabled={completed || startSession.isPending}
          onClick={() => {
            if (activeIndex === null) return;
            startSession.mutate(
              { courseId, stepOrder: exercises[activeIndex].stepOrder },
              { onSuccess: (session) => navigate(toSessionPath(session.sessionId as number)) },
            );
          }}
        >
          운동 시작하기
        </CTAButton.Single>
      </CTAButton>
    </main>
  );
}
