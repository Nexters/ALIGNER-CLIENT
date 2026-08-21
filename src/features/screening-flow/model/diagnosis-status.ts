import type {
  BodyPartResponse,
  ScreeningResultResponse,
} from "@/shared/api/generated/data-contracts";

export type DiagnosisStatus =
  | { kind: "loading" }
  | { kind: "result"; result: ScreeningResultResponse; bodyParts: BodyPartResponse[] };

export type Result = DiagnosisStatus["kind"];
