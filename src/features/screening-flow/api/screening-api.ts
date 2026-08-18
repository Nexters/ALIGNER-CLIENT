import { coursesApi, screeningApi } from "@/shared/api/http";
import type {
  BodyPartResponse,
  ScreeningCauseResponse,
  ScreeningResultResponse,
} from "@/shared/api/generated/data-contracts";
import type { BodyPartCode } from "../constants/body-parts";
import type {
  BodyPart,
  RecommendCourseRequest,
  RecommendCourseResponse,
  ScreeningCause,
  ScreeningResult,
} from "./types";

function toBodyPart(response: BodyPartResponse): BodyPart {
  return {
    bodyPartCode: response.bodyPartCode as BodyPartCode,
    name: response.name!,
  };
}

function toScreeningCause(response: ScreeningCauseResponse): ScreeningCause {
  return {
    causeCode: response.causeCode!,
    name: response.name!,
    bodyPartCode: response.bodyPartCode as BodyPartCode,
    description: response.description ?? null,
    rank: response.rank!,
    score: response.score!,
  };
}

function toScreeningResult(response: ScreeningResultResponse): ScreeningResult {
  return {
    resultId: response.resultId!,
    causes: (response.causes ?? []).map(toScreeningCause),
    createdAt: response.createdAt!,
  };
}

export async function getLatestScreeningResult(): Promise<ScreeningResult> {
  const response = await screeningApi.getLatestResult();
  return toScreeningResult(response.data);
}

export async function getBodyParts(): Promise<BodyPart[]> {
  const response = await screeningApi.getBodyParts();
  return response.data.map(toBodyPart);
}

export async function recommendCourse(
  data: RecommendCourseRequest,
): Promise<RecommendCourseResponse> {
  const response = await coursesApi.recommend(data);
  return { courseId: response.data.courseId! };
}
