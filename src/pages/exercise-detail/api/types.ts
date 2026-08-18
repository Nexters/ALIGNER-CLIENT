// GET /catalog/exercises/{exerciseId} 응답 스펙 (스웨거 ExerciseDetailResponse 기준)
export type BodyPartCode = "BACK" | "ABDOMEN" | "PELVIS";
export type MuscleRole = "STRETCH" | "STRENGTHEN";

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
  difficulty: string | null;
  category: string | null;
  cautionNote: string | null;
  muscles: MuscleResponse[];
  voiceCues: VoiceCueResponse[];
}
