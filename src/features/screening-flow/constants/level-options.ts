import { COURSE_LEVEL_LABELS } from "@/entities/course";

export const LEVEL_OPTIONS: { level: number; label: string }[] = Object.entries(
  COURSE_LEVEL_LABELS,
).map(([level, label]) => ({ level: Number(level), label: `난이도 ${label}` }));
