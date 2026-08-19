// GET /catalog/exercises/{exerciseId} 응답 스펙 (스웨거 ExerciseDetailResponse 기준)
export type BodyPartCode = "BACK" | "ABDOMEN" | "PELVIS";
export type MuscleRole = "STRETCH" | "STRENGTHEN";
export type ExerciseDifficulty = "EASY" | "MEDIUM" | "HARD";

export interface MuscleResponse {
  muscleCode: string;
  name: string;
  bodyPartCode: BodyPartCode;
  frontHighlightAssetKey: string | null;
  backHighlightAssetKey: string | null;
  role: MuscleRole;
  displayOrder: number;
}

export interface VoiceCueResponse {
  displayOrder: number;
  startOffsetSeconds: number | null;
  endOffsetSeconds: number | null;
  content: string;
}

export interface ExerciseDetailResponse {
  exerciseId: number;
  name: string;
  imageAssetKey: string | null;
  videoUrl: string | null;
  thumbnailUrl: string | null;
  defaultSetCount: number | null;
  defaultRepCount: number | null;
  defaultDurationSeconds: number | null;
  metValue: number | null;
  difficulty: ExerciseDifficulty | null;
  category: string | null;
  cautionNote: string | null;
  muscles: MuscleResponse[];
  voiceCues: VoiceCueResponse[];
  // TODO(소정): 데일리 루틴 내 "n번째 운동" 단계 표시용 필드. 아직 스웨거 스펙에 없어
  // 실제 필드명이 확정되면 이름을 맞춰야 한다.
  stepOrder: number | null;
  totalStepCount: number | null;
}
