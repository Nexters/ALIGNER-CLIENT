import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { FALLBACK_POSE_IMAGE } from "@/entities/course";
import { useStartSession } from "@/entities/session";
import { toSessionPath } from "@/shared/config/routes";
import { Button, CTAButton } from "@/shared/ui/button";
import { CroppedWorkoutImage } from "@/shared/ui/cropped-workout-image";
import { MuscleDiagram } from "@/shared/ui/muscle-diagram";
import { Skeleton } from "@/shared/ui/skeleton";
import { TopNavBar } from "@/shared/ui/top-nav-bar";
import { mapExerciseDetailResponse } from "../api/map-exercise";
import { useExercise } from "../api/use-exercise";

/** 코스 순서 목록에서 이미 알고 있는 값. 상세 API 응답이 오기 전까지 이걸로 먼저 그린다. */
export interface ExerciseDetailNavigationState {
  courseId: number;
  stepOrder: number;
  name: string;
  imageSrc: string;
  step: { current: number; total: number } | null;
}

export function ExerciseDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const preview = location.state as ExerciseDetailNavigationState | null;
  const exerciseId = params.exerciseId ? Number(params.exerciseId) : null;
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);

  const { data } = useExercise(exerciseId);
  const startSession = useStartSession();

  if (exerciseId === null || (!data && !preview)) {
    return null;
  }

  const exercise = data ? mapExerciseDetailResponse(data) : null;
  const name = exercise?.name ?? preview?.name ?? "";
  const imageSrc = exercise?.imageSrc ?? preview?.imageSrc ?? FALLBACK_POSE_IMAGE;
  // 단계(1/6)는 코스 순서 목록에서 이미 알고 있으니 props를 우선 쓰고, 없을 때만 API 응답을 쓴다.
  const step = preview?.step ?? exercise?.step ?? null;
  const difficulty = exercise?.difficulty ?? null;
  const activeBodyPart = selectedBodyPart ?? exercise?.guideGroups[0]?.bodyPart ?? null;
  const guide =
    exercise?.guideGroups.find((group) => group.bodyPart === activeBodyPart) ??
    exercise?.guideGroups[0] ??
    null;

  return (
    <main className="relative flex min-h-screen flex-col items-center px-[2rem] pb-[10rem]">
      <TopNavBar onBack={() => navigate(-1)} className="w-full">
        <span className="typo-headline-emphasized text-black">데일리 루틴</span>
      </TopNavBar>

      <div className="mt-[2rem] flex w-full flex-col items-start gap-[0.8rem]">
        <p className="typo-subheadline-regular text-gray-50">
          {step && `${step.current}/${step.total} `}난이도{" "}
          {difficulty ?? (
            <Skeleton className="inline-block h-[1.6rem] w-[2rem] rounded-[0.4rem] align-middle" />
          )}
        </p>
        <h1 className="typo-title-2-5-emphasized text-black">{name}</h1>
      </div>

      <div className="relative mt-[1.6rem] h-[28rem] w-full overflow-hidden rounded-[2.8rem] bg-gray-97">
        <CroppedWorkoutImage src={imageSrc} alt={name} imageClassName="object-cover" />
      </div>

      <h2 className="mt-[4.8rem] w-full typo-headline-emphasized text-black">운동 가이드</h2>

      {exercise && guide ? (
        <>
          <div
            className="mt-[1rem] flex w-full items-center gap-[1.2rem]"
            role="tablist"
            aria-label="신체 부위"
          >
            {exercise.guideGroups.map((group) => (
              <Button
                key={group.bodyPart}
                role="tab"
                aria-selected={activeBodyPart === group.bodyPart}
                color="white"
                size="small"
                isSelected={activeBodyPart === group.bodyPart}
                onClick={() => setSelectedBodyPart(group.bodyPart)}
              >
                {group.bodyPart}
              </Button>
            ))}
          </div>

          <div className="mt-[2.5rem] flex w-full items-stretch gap-[1.2rem]">
            <div className="relative flex h-[20.4rem] w-[19rem] shrink-0 items-center justify-center overflow-hidden rounded-[2.4rem] bg-gray-10">
              <MuscleDiagram
                highlightedMuscles={guide.highlightedMuscles}
                view={guide.view}
                role="img"
                aria-label={`${guide.bodyPart} 근육 다이어그램`}
              />
            </div>
            <div className="flex min-h-[20.4rem] flex-1 flex-col gap-[1.6rem] rounded-[2.4rem] bg-white p-[1.6rem]">
              <span
                aria-hidden="true"
                className="flex size-[3.2rem] shrink-0 items-center justify-center rounded-full bg-primary-500"
              >
                <span className="size-[0.6rem] rounded-full bg-gray-10" />
              </span>
              <div className="flex flex-col gap-[0.8rem]">
                <p className="typo-headline-emphasized text-gray-10">핵심 동작</p>
                <p className="typo-body-regular whitespace-pre-line text-gray-30">{guide.tip}</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-[1rem] flex w-full items-center gap-[1.2rem]" aria-hidden="true">
            <Skeleton className="h-[3.6rem] w-[6.4rem] rounded-full" />
            <Skeleton className="h-[3.6rem] w-[6.4rem] rounded-full" />
          </div>

          <div className="mt-[2.5rem] flex w-full items-stretch gap-[1.2rem]" aria-hidden="true">
            <Skeleton className="h-[20.4rem] w-[19rem] shrink-0 rounded-[2.4rem]" />
            <div className="flex min-h-[20.4rem] flex-1 flex-col gap-[1.6rem] rounded-[2.4rem] bg-white p-[1.6rem]">
              <Skeleton className="size-[3.2rem] shrink-0 rounded-full" />
              <div className="flex flex-col gap-[0.8rem]">
                <Skeleton className="h-[2.2rem] w-[8rem] rounded-[0.6rem]" />
                <Skeleton className="h-[1.8rem] w-full rounded-[0.6rem]" />
                <Skeleton className="h-[1.8rem] w-3/4 rounded-[0.6rem]" />
              </div>
            </div>
          </div>
        </>
      )}

      <CTAButton>
        <CTAButton.Single
          disabled={!preview || startSession.isPending}
          onClick={() => {
            if (!preview) return;
            startSession.mutate(
              { courseId: preview.courseId, stepOrder: preview.stepOrder },
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
