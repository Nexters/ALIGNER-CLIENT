import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getMuscleDiagramZoom, MOCK_EXERCISES, type ExerciseBodyPart } from "@/entities/course";
import { Button, CTAButton } from "@/shared/ui/button";
import { MuscleDiagram } from "@/shared/ui/muscle-diagram";
import { TopNavBar } from "@/shared/ui/top-nav-bar";

const BODY_PARTS: ExerciseBodyPart[] = ["가슴", "코어", "허리", "골반"];

export function ExerciseDetailPage() {
  const navigate = useNavigate();
  const { exerciseId } = useParams();
  const [selectedBodyPart, setSelectedBodyPart] = useState<ExerciseBodyPart>(BODY_PARTS[0]);

  const exerciseIndex = MOCK_EXERCISES.findIndex((exercise) => exercise.id === exerciseId);
  const exercise = MOCK_EXERCISES[exerciseIndex];

  if (!exercise) return null;

  // TODO: 가슴 외 신체 부위 가이드는 아직 디자인이 없어 없으면 첫 번째 가이드로 대체한다.
  const guide =
    exercise.guides.find((candidate) => candidate.bodyPart === selectedBodyPart) ??
    exercise.guides[0];

  return (
    <main className="relative flex min-h-screen flex-col items-center pb-[10rem]">
      <TopNavBar onBack={() => navigate(-1)} className="w-full">
        <span className="typo-headline-emphasized text-black">데일리 루틴</span>
      </TopNavBar>

      <div className="mt-[3rem] flex w-full flex-col items-start gap-[0.8rem]">
        <p className="typo-subheadline-regular text-gray-50">
          {exerciseIndex + 1}/{MOCK_EXERCISES.length} ·난이도 {exercise.difficulty}
        </p>
        <h1 className="typo-title-2-5-emphasized text-black">{exercise.name}</h1>
      </div>

      <div className="relative mt-[1.6rem] h-[28rem] w-full overflow-hidden rounded-[2.8rem] bg-gray-97">
        <img src={exercise.imageSrc} alt={exercise.name} className="size-full object-cover" />
      </div>

      <h2 className="mt-[4.8rem] w-full typo-headline-emphasized text-black">운동 가이드</h2>

      <div
        className="mt-[1rem] flex w-full items-center gap-[1.2rem]"
        role="tablist"
        aria-label="신체 부위"
      >
        {BODY_PARTS.map((bodyPart) => (
          <Button
            key={bodyPart}
            role="tab"
            aria-selected={selectedBodyPart === bodyPart}
            color="white"
            size="small"
            isSelected={selectedBodyPart === bodyPart}
            onClick={() => setSelectedBodyPart(bodyPart)}
          >
            {bodyPart}
          </Button>
        ))}
      </div>

      <div className="mt-[2.5rem] flex w-full items-stretch gap-[1.2rem]">
        <div className="relative flex h-[20.4rem] w-[19rem] shrink-0 items-center justify-center overflow-hidden rounded-[2.4rem] bg-gray-10">
          <MuscleDiagram
            highlightedMuscles={guide.highlightedMuscles}
            zoom={getMuscleDiagramZoom(guide.bodyPart)}
            role="img"
            aria-label={`${guide.bodyPart} 근육 다이어그램`}
          />
        </div>
        <div className="flex h-[20.4rem] flex-1 flex-col gap-[1.6rem] rounded-[2.4rem] bg-white p-[1.6rem]">
          <span
            aria-hidden="true"
            className="flex size-[3.2rem] shrink-0 items-center justify-center rounded-full bg-primary-500"
          >
            <span className="size-[0.6rem] rounded-full bg-gray-10" />
          </span>
          <div className="flex flex-col gap-[0.8rem]">
            <p className="typo-headline-emphasized text-gray-10">핵심 동작</p>
            <p className="typo-body-regular text-gray-30">{guide.tip}</p>
          </div>
        </div>
      </div>

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
