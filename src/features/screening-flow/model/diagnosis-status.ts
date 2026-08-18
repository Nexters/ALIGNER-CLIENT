import type { BodyPart, ScreeningResult } from "../api/types";

export type DiagnosisStatus =
  { kind: "loading" } | { kind: "result"; result: ScreeningResult; bodyParts: BodyPart[] };

export type Result = DiagnosisStatus["kind"];
