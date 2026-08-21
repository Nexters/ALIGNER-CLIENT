import type { BodyPartResponse } from "@/shared/api/generated/data-contracts";
import type { MuscleName } from "@/shared/ui/muscle-diagram";

export type BodyPartCode = NonNullable<BodyPartResponse["bodyPartCode"]>;

export const BODY_PART_LABELS: Record<BodyPartCode, string> = {
  BACK: "등",
  ABDOMEN: "복부",
  PELVIS: "골반",
};

// 코스 강화 난이도(1=하·2=중·3=상). 운동 개별 난이도(EXERCISE_DIFFICULTY_LABELS)와는 다른 축이다.
export const COURSE_LEVEL_LABELS: Record<number, string> = {
  1: "하",
  2: "중",
  3: "상",
};

// 운동 개별 난이도. 스웨거가 아직 값 집합을 고정하지 않아 string 키로 느슨하게 둔다.
export const EXERCISE_DIFFICULTY_LABELS: Record<string, string> = {
  EASY: "하",
  MEDIUM: "중",
  HARD: "상",
};

// API의 근육 표시 이름은 다이어그램 레이어 이름과 문자열이 정확히 일치하지 않을 수 있다
// (예: API "상부 승모근" vs 다이어그램 레이어 "승모근" — 다이어그램은 승모근을 "승모근"(상부)과
// "중 하부 승모근" 두 레이어로만 나눠뒀다). 이런 표기 차이는 muscleCode 기준 별칭으로 흡수한다.
// 새 코드가 나오면 여기에 추가한다.
export const MUSCLE_CODE_ALIASES: Partial<Record<string, MuscleName>> = {
  UPPER_TRAPEZIUS: "승모근",
};
