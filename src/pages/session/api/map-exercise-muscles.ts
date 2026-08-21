import { MUSCLE_CODE_ALIASES } from "@/entities/course";
import type { MuscleResponse } from "@/shared/api/generated/data-contracts";
import { BACK_MUSCLE_NAMES, FRONT_MUSCLE_NAMES, type MuscleName } from "@/shared/ui/muscle-diagram";

const FRONT_MUSCLE_NAME_SET = new Set<string>(FRONT_MUSCLE_NAMES);
const BACK_MUSCLE_NAME_SET = new Set<string>(BACK_MUSCLE_NAMES);

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
