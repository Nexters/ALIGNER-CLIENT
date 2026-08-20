import type { ExerciseDetailResponse } from "@/shared/api/generated/data-contracts";

interface SessionExerciseMediaProps {
  exercise: ExerciseDetailResponse | undefined;
  muted: boolean;
  onTimeUpdate: (currentTime: number) => void;
}

export function SessionExerciseMedia({ exercise, muted, onTimeUpdate }: SessionExerciseMediaProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {exercise?.videoUrl ? (
        <video
          src={exercise.videoUrl}
          className="absolute inset-0 size-full object-cover object-bottom"
          autoPlay
          loop
          muted={muted}
          playsInline
          onTimeUpdate={(event) => onTimeUpdate(event.currentTarget.currentTime)}
        />
      ) : (
        <div className="absolute inset-0 bg-bg-muted" />
      )}
    </div>
  );
}
