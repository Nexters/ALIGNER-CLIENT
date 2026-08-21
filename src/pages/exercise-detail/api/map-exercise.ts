import {
  BODY_PART_LABELS,
  EXERCISE_DIFFICULTY_LABELS,
  MUSCLE_CODE_ALIASES,
  resolveThumbnailSrc,
  type BodyPartCode,
} from "@/entities/course";
import type { MuscleResponse } from "@/shared/api/generated/data-contracts";
import {
  BACK_MUSCLE_NAMES,
  MUSCLE_NAMES,
  type MuscleDiagramView,
  type MuscleName,
} from "@/shared/ui/muscle-diagram";
import type { ExerciseDetailResponse } from "./types";

const BODY_PART_ORDER: BodyPartCode[] = ["BACK", "ABDOMEN", "PELVIS"];

const MUSCLE_NAME_SET = new Set<string>(MUSCLE_NAMES);
const BACK_MUSCLE_NAME_SET = new Set<string>(BACK_MUSCLE_NAMES);

// 다이어그램은 근육마다 앞/뒤 중 한쪽에만 실루엣이 있다. 그룹 안에 뒷면 근육이 하나라도 있으면
// 뒷면을 보여준다 — 하이라이트할 근육이 안 보이는 면에 그려져 있으면 아무 것도 안 켜진 것처럼 보인다.
function resolveView(highlightedMuscles: MuscleName[]): MuscleDiagramView {
  return highlightedMuscles.some((name) => BACK_MUSCLE_NAME_SET.has(name)) ? "back" : "front";
}

// 별칭 테이블에 없는 근육은 이름 문자열이 다이어그램 목록과 정확히 일치할 때만 하이라이트한다.
// 그마저도 없으면 하이라이트 없이 그냥 넘어간다 — 목록 밖 근육이라도 탭 자체는 보여준다.
function toMuscleName(muscle: MuscleResponse): MuscleName | null {
  const alias = muscle.muscleCode ? MUSCLE_CODE_ALIASES[muscle.muscleCode] : undefined;
  if (alias) return alias;
  const name = muscle.name ?? "";
  return MUSCLE_NAME_SET.has(name) ? (name as MuscleName) : null;
}

export interface ExerciseGuideGroupView {
  bodyPart: string;
  highlightedMuscles: MuscleName[];
  view: MuscleDiagramView;
  tip: string;
}

export interface ExerciseStepView {
  current: number;
  total: number;
}

export interface ExerciseDetailView {
  exerciseId: number;
  name: string;
  difficulty: string;
  imageSrc: string;
  guideGroups: ExerciseGuideGroupView[];
  step: ExerciseStepView | null;
}

// muscles가 비어 있어도(백엔드 작업 중) 운동 가이드 UI 자체는 항상 보여준다 — 이 경우
// 하이라이트 없는 기본 다이어그램 탭 하나를 보여준다.
const DEFAULT_GUIDE_GROUP: ExerciseGuideGroupView = {
  bodyPart: "전신",
  highlightedMuscles: [],
  view: "front",
  tip: "-",
};

function buildTip(muscles: MuscleResponse[]): string {
  const descriptions = muscles
    .slice()
    .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
    .map((muscle) => muscle.description)
    .filter((description): description is string => Boolean(description));

  return descriptions.length > 0 ? descriptions.join("\n") : "-";
}

function groupMuscles(muscles: MuscleResponse[]): ExerciseGuideGroupView[] {
  const groups = BODY_PART_ORDER.filter((code) =>
    muscles.some((muscle) => muscle.bodyPartCode === code),
  ).map((code) => {
    const musclesInPart = muscles.filter((muscle) => muscle.bodyPartCode === code);
    const highlightedMuscles = musclesInPart
      .map((muscle) => toMuscleName(muscle))
      .filter((name): name is MuscleName => name !== null);

    return {
      bodyPart: BODY_PART_LABELS[code],
      highlightedMuscles,
      view: resolveView(highlightedMuscles),
      tip: buildTip(musclesInPart),
    };
  });

  return groups.length > 0 ? groups : [DEFAULT_GUIDE_GROUP];
}

function resolveStep(response: ExerciseDetailResponse): ExerciseStepView | null {
  if (response.stepOrder == null || response.totalStepCount == null) return null;
  return { current: response.stepOrder, total: response.totalStepCount };
}

export function mapExerciseDetailResponse(response: ExerciseDetailResponse): ExerciseDetailView {
  return {
    exerciseId: response.exerciseId!,
    name: response.name!,
    difficulty: response.difficulty
      ? (EXERCISE_DIFFICULTY_LABELS[response.difficulty] ?? "-")
      : "-",
    imageSrc: resolveThumbnailSrc(response.thumbnailUrl ?? null, response.imageAssetKey ?? null),
    guideGroups: groupMuscles(response.muscles ?? []),
    // TODO(소정): stepOrder/totalStepCount는 아직 스웨거 스펙에 없는 임시 필드명이다.
    step: resolveStep(response),
  };
}
