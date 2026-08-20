import type { PerceivedResult } from "../api/types";

export const ANSWER_OPTIONS: { value: PerceivedResult; label: string }[] = [
  { value: "SUCCEEDED", label: "잘됐어요" },
  { value: "STILL_HARD", label: "아직 어려워요" },
  { value: "TOO_HARD", label: "안될 거 같아요" },
];
