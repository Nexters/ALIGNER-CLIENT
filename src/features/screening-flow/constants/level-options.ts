import type { CourseLevel } from "../api/types";

export const LEVEL_OPTIONS: { level: CourseLevel; label: string }[] = [
  { level: 1, label: "난이도 하" },
  { level: 2, label: "난이도 중" },
  { level: 3, label: "난이도 상" },
];
