import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Button, CTAButton } from "@/shared/ui/button";
import { CroppedWorkoutImage } from "@/shared/ui/cropped-workout-image";
import { MuscleDiagram } from "@/shared/ui/muscle-diagram";
import { TopNavBar } from "@/shared/ui/top-nav-bar";
import { mapExerciseDetailResponse } from "../api/map-exercise";
import { useExercise } from "../api/use-exercise";

export function ExerciseDetailPage() {
  const navigate = useNavigate();
  const params = useParams();
  const exerciseId = params.exerciseId ? Number(params.exerciseId) : null;
  const [selectedBodyPart, setSelectedBodyPart] = useState<string | null>(null);

  const { data, isPending } = useExercise(exerciseId);

  if (exerciseId === null || isPending || !data) {
    return null;
  }

  const exercise = mapExerciseDetailResponse(data);
  const activeBodyPart = selectedBodyPart ?? exercise.guideGroups[0]?.bodyPart ?? null;
  const guide =
    exercise.guideGroups.find((group) => group.bodyPart === activeBodyPart) ??
    exercise.guideGroups[0];

  return (
    <main className="relative flex min-h-screen flex-col items-center px-[2rem] pb-[10rem]">
      <TopNavBar onBack={() => navigate(-1)} className="w-full">
        <span className="typo-headline-emphasized text-black">데일리 루틴</span>
      </TopNavBar>

      <div className="mt-[2rem] flex w-full flex-col items-start gap-[0.8rem]">
        <p className="typo-subheadline-regular text-gray-50">난이도 {exercise.difficulty}</p>
        <h1 className="typo-title-2-5-emphasized text-black">{exercise.name}</h1>
      </div>

      <div className="relative mt-[1.6rem] h-[28rem] w-full overflow-hidden rounded-[2.8rem] bg-gray-97">
        <CroppedWorkoutImage src={exercise.imageSrc} alt={exercise.name} />
      </div>

      {guide && (
        <>
          <h2 className="mt-[4.8rem] w-full typo-headline-emphasized text-black">운동 가이드</h2>

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
            {exercise.tip && (
              <div className="flex h-[20.4rem] flex-1 flex-col gap-[1.6rem] rounded-[2.4rem] bg-white p-[1.6rem]">
                <span
                  aria-hidden="true"
                  className="flex size-[3.2rem] shrink-0 items-center justify-center rounded-full bg-primary-500"
                >
                  <span className="size-[0.6rem] rounded-full bg-gray-10" />
                </span>
                <div className="flex flex-col gap-[0.8rem]">
                  <p className="typo-headline-emphasized text-gray-10">핵심 동작</p>
                  <p className="typo-body-regular text-gray-30">{exercise.tip}</p>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      <CTAButton>
        <CTAButton.Single
          // TODO: 운동 시작 플로우 화면 구현 후 실제 라우팅 연결
          onClick={() => {}}
        >
          운동 시작하기
        </CTAButton.Single>
      </CTAButton>
    </main>
  );
}
