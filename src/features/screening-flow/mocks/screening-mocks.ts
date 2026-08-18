import type { BodyPart, RecommendCourseResponse, ScreeningResult } from "../api/types";
import { BODY_PART_CODES, BODY_PART_NAMES } from "../constants/body-parts";

// TODO: 인증 인프라(카카오 로그인 + apiClient 토큰 부착)가 준비되면
// api/screening-api.ts의 실제 함수 호출로 교체한다.

export const MOCK_SCREENING_RESULT: ScreeningResult = {
  resultId: 1,
  causes: [
    {
      causeCode: "THORACIC_STIFFNESS",
      name: "굳은 흉추",
      bodyPartCode: "BACK",
      description: null,
      rank: 1,
      score: 7,
    },
    {
      causeCode: "PELVIC_INSTABILITY",
      name: "불안정한 골반",
      bodyPartCode: "PELVIS",
      description: null,
      rank: 2,
      score: 5,
    },
  ],
  createdAt: "2026-08-15T00:00:00Z",
};

export const MOCK_BODY_PARTS: BodyPart[] = BODY_PART_CODES.map((bodyPartCode) => ({
  bodyPartCode,
  name: BODY_PART_NAMES[bodyPartCode],
}));

export function mockGetLatestScreeningResult(): Promise<ScreeningResult> {
  return Promise.resolve(MOCK_SCREENING_RESULT);
}

export function mockGetBodyParts(): Promise<BodyPart[]> {
  return Promise.resolve(MOCK_BODY_PARTS);
}

export function mockRecommendCourse(): Promise<RecommendCourseResponse> {
  return Promise.resolve({ courseId: 1 });
}
