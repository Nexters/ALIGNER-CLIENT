import type {
  CompleteSessionRequest,
  SessionExerciseRecordResponse,
} from "@/shared/api/generated/data-contracts";

export function buildCompleteSessionRequest(
  exerciseRecords: SessionExerciseRecordResponse[],
): CompleteSessionRequest {
  return {
    exerciseRecords: exerciseRecords.map((record) => ({
      courseStepExerciseId: record.courseStepExerciseId,
      completed: true,
      performedDurationSeconds: record.durationSeconds ?? null,
    })),
  };
}
