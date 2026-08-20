import { Button } from "@/shared/ui/button";
import { useExercise } from "../api/use-exercise";
import { useRecordPerceivedResult } from "../api/use-record-perceived-result";
import { ANSWER_OPTIONS } from "../constants/answer-options";

interface CompletePoseFeedbackProps {
  sessionId: number;
  poseName: string;
  pinPoseExerciseId: number | null;
}

export function CompletePoseFeedback({
  sessionId,
  poseName,
  pinPoseExerciseId,
}: CompletePoseFeedbackProps) {
  const { mutate, isPending } = useRecordPerceivedResult(sessionId);
  const { data: exercise } = useExercise(pinPoseExerciseId);

  return (
    <main className="flex min-h-screen flex-col gap-7 bg-bg-inverse pt-8 px-6">
      {exercise?.videoUrl ? (
        <video
          src={exercise.videoUrl}
          className="h-112 w-full rounded-[2.8rem] object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      ) : (
        <div className="h-112 w-full rounded-[2.8rem] bg-bg-muted" />
      )}

      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-4">
          <h1 className="typo-title-1-emphasized text-ink-inverse">
            오늘 {poseName},
            <br />
            어땠어요?
          </h1>
          <p className="typo-subheadline-regular text-gray-80">느낀 그대로 골라주세요.</p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            {ANSWER_OPTIONS.map(({ value, label }) => (
              <Button key={value} color="black" disabled={isPending} onClick={() => mutate(value)}>
                {label}
              </Button>
            ))}
          </div>
          <p className="typo-caption-1-regular w-full text-gray-80">
            '안될 거 같아요'를 고르면 다른 자세로 바꿔드려요.
          </p>
        </div>
      </div>
    </main>
  );
}
