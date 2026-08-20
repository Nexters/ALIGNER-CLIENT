import type { MuscleResponse } from "@/shared/api/generated/data-contracts";
import { BACK_MUSCLE_NAMES, FRONT_MUSCLE_NAMES, type MuscleName } from "@/shared/ui/muscle-diagram";

const FRONT_MUSCLE_NAME_SET = new Set<string>(FRONT_MUSCLE_NAMES);
const BACK_MUSCLE_NAME_SET = new Set<string>(BACK_MUSCLE_NAMES);

// exercise-detail/api/map-exercise.ts와 같은 이유의 별칭 테이블. API 근육 표시 이름이
// 다이어그램 레이어 이름과 정확히 일치하지 않는 경우를 muscleCode 기준으로 흡수한다.
// TODO: exercise-detail/api/map-exercise.ts의 toMuscleName과 이 테이블이 중복이다.
// ADR-0007의 BODY_PART_LABELS/LEVEL_LABELS 중복과 같은 성격 — entities/course 통합 때 같이 정리한다.
const MUSCLE_CODE_ALIASES: Partial<Record<string, MuscleName>> = {
  UPPER_TRAPEZIUS: "승모근",
};

function toMuscleName(muscle: MuscleResponse): MuscleName | null {
  const alias = muscle.muscleCode ? MUSCLE_CODE_ALIASES[muscle.muscleCode] : undefined;
  if (alias) return alias;
  const name = muscle.name ?? "";
  if (FRONT_MUSCLE_NAME_SET.has(name) || BACK_MUSCLE_NAME_SET.has(name)) {
    return name as MuscleName;
  }
  return null;
}

export interface ExerciseMuscleHighlights {
  front: MuscleName[];
  back: MuscleName[];
}

export function mapExerciseMuscles(muscles: MuscleResponse[]): ExerciseMuscleHighlights {
  const names = muscles.map(toMuscleName).filter((name): name is MuscleName => name !== null);

  return {
    front: names.filter((name) => FRONT_MUSCLE_NAME_SET.has(name)),
    back: names.filter((name) => BACK_MUSCLE_NAME_SET.has(name)),
  };
}
