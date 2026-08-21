import { coursesApi, screeningApi } from "@/shared/api";
import type {
  BodyPartResponse,
  RecommendCourseRequest,
  RecommendCourseResponse,
  ScreeningResultResponse,
} from "@/shared/api/generated/data-contracts";

export async function getLatestScreeningResult(): Promise<ScreeningResultResponse> {
  const response = await screeningApi.getLatestResult();
  return response.data;
}

export async function getBodyParts(): Promise<BodyPartResponse[]> {
  const response = await screeningApi.getBodyParts();
  return response.data;
}

export async function recommendCourse(
  data: RecommendCourseRequest,
): Promise<RecommendCourseResponse> {
  const response = await coursesApi.recommend(data);
  return response.data;
}
