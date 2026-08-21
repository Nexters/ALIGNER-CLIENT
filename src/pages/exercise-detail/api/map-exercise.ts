import { resolveThumbnailSrc } from "@/entities/course";
import type { MuscleResponse } from "@/shared/api/generated/data-contracts";
import {
  BACK_MUSCLE_NAMES,
  MUSCLE_NAMES,
  type MuscleDiagramView,
  type MuscleName,
} from "@/shared/ui/muscle-diagram";
import type { ExerciseDetailResponse } from "./types";

type BodyPartCode = NonNullable<MuscleResponse["bodyPartCode"]>;

const BODY_PART_LABELS: Record<BodyPartCode, string> = {
  BACK: "등",
  ABDOMEN: "복부",
  PELVIS: "골반",
};

// difficulty는 스웨거에서 아직 값 집합을 고정하지 않은 string이다 — 알려진 값만 라벨을 붙이고,
// 나머지는 아래 mapExerciseDetailResponse에서 "-"로 폴백한다.
const DIFFICULTY_LABELS: Record<string, string> = {
  EASY: "하",
  MEDIUM: "중",
  HARD: "상",
};

const BODY_PART_ORDER: BodyPartCode[] = ["BACK", "ABDOMEN", "PELVIS"];

const MUSCLE_NAME_SET = new Set<string>(MUSCLE_NAMES);
const BACK_MUSCLE_NAME_SET = new Set<string>(BACK_MUSCLE_NAMES);

// 다이어그램은 근육마다 앞/뒤 중 한쪽에만 실루엣이 있다. 그룹 안에 뒷면 근육이 하나라도 있으면
// 뒷면을 보여준다 — 하이라이트할 근육이 안 보이는 면에 그려져 있으면 아무 것도 안 켜진 것처럼 보인다.
function resolveView(highlightedMuscles: MuscleName[]): MuscleDiagramView {
  return highlightedMuscles.some((name) => BACK_MUSCLE_NAME_SET.has(name)) ? "back" : "front";
}

// API의 근육 표시 이름은 다이어그램 레이어 이름과 문자열이 정확히 일치하지 않을 수 있다
// (예: API "상부 승모근" vs 다이어그램 레이어 "승모근" — 다이어그램은 승모근을 "승모근"(상부)과
// "중 하부 승모근" 두 레이어로만 나눠뒀다). 이런 표기 차이는 muscleCode 기준 별칭으로 흡수한다.
// 새 코드가 나오면 여기에 추가한다.
const MUSCLE_CODE_ALIASES: Partial<Record<string, MuscleName>> = {
  UPPER_TRAPEZIUS: "승모근",
};

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
    difficulty: response.difficulty ? (DIFFICULTY_LABELS[response.difficulty] ?? "-") : "-",
    imageSrc: resolveThumbnailSrc(response.thumbnailUrl ?? null, response.imageAssetKey ?? null),
    guideGroups: groupMuscles(response.muscles ?? []),
    // TODO(소정): stepOrder/totalStepCount는 아직 스웨거 스펙에 없는 임시 필드명이다.
    step: resolveStep(response),
  };
}
