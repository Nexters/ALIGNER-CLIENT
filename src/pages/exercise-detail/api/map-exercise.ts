import { getPoseImageSrc } from "@/entities/course";
import {
  BACK_MUSCLE_NAMES,
  MUSCLE_NAMES,
  type MuscleDiagramView,
  type MuscleName,
} from "@/shared/ui/muscle-diagram";
import type {
  BodyPartCode,
  ExerciseDetailResponse,
  ExerciseDifficulty,
  MuscleResponse,
} from "./types";

const BODY_PART_LABELS: Record<BodyPartCode, string> = {
  BACK: "등",
  ABDOMEN: "복부",
  PELVIS: "골반",
};

const DIFFICULTY_LABELS: Record<ExerciseDifficulty, string> = {
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
  const alias = MUSCLE_CODE_ALIASES[muscle.muscleCode];
  if (alias) return alias;
  return MUSCLE_NAME_SET.has(muscle.name) ? (muscle.name as MuscleName) : null;
}

export interface ExerciseGuideGroupView {
  bodyPart: string;
  highlightedMuscles: MuscleName[];
  view: MuscleDiagramView;
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
  tip: string;
  step: ExerciseStepView | null;
}

// muscles가 비어 있어도(백엔드 작업 중) 운동 가이드 UI 자체는 항상 보여준다 — 이 경우
// 하이라이트 없는 기본 다이어그램 탭 하나를 보여준다.
const DEFAULT_GUIDE_GROUP: ExerciseGuideGroupView = {
  bodyPart: "전신",
  highlightedMuscles: [],
  view: "front",
};

function groupMuscles(muscles: MuscleResponse[]): ExerciseGuideGroupView[] {
  const groups = BODY_PART_ORDER.filter((code) =>
    muscles.some((muscle) => muscle.bodyPartCode === code),
  ).map((code) => {
    const highlightedMuscles = muscles
      .filter((muscle) => muscle.bodyPartCode === code)
      .map((muscle) => toMuscleName(muscle))
      .filter((name): name is MuscleName => name !== null);

    return {
      bodyPart: BODY_PART_LABELS[code],
      highlightedMuscles,
      view: resolveView(highlightedMuscles),
    };
  });

  return groups.length > 0 ? groups : [DEFAULT_GUIDE_GROUP];
}

function resolveStep(response: ExerciseDetailResponse): ExerciseStepView | null {
  if (response.stepOrder === null || response.totalStepCount === null) return null;
  return { current: response.stepOrder, total: response.totalStepCount };
}

export function mapExerciseDetailResponse(response: ExerciseDetailResponse): ExerciseDetailView {
  return {
    exerciseId: response.exerciseId,
    name: response.name,
    difficulty: response.difficulty ? DIFFICULTY_LABELS[response.difficulty] : "-",
    // 운동 이미지는 target-pose/* 매핑 테이블에 없는 exercise/* 네임스페이스라 지금은 항상 폴백으로 빠진다.
    imageSrc: getPoseImageSrc(response.imageAssetKey),
    guideGroups: groupMuscles(response.muscles),
    // TODO(소정): 핵심 동작 설명은 추후 muscles[].instruction 필드로 내려줄 예정.
    // 아직 스펙에 없어 임시로 cautionNote를 쓰고, 없으면 "-"로 표기한다.
    tip: response.cautionNote ?? "-",
    // TODO(소정): stepOrder/totalStepCount는 아직 스웨거 스펙에 없는 임시 필드명이다.
    step: resolveStep(response),
  };
}
