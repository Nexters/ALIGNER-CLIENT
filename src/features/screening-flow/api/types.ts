import type { BodyPartCode } from "../constants/body-parts";

//TODO: Swagger type 및 전역 type으로 교체 예정
export type ApiErrorResponse = {
  code: string;
  message: string;
};

export type ScreeningCause = {
  causeCode: string;
  name: string;
  bodyPartCode: BodyPartCode;
  description: string | null;
  rank: number;
  score: number;
};

export type ScreeningResult = {
  resultId: number;
  causes: ScreeningCause[];
  createdAt: string;
};

export type BodyPart = {
  bodyPartCode: BodyPartCode;
  name: string;
};

export type CourseLevel = 1 | 2 | 3;

export type RecommendCourseRequest = {
  bodyPartCode: BodyPartCode;
  level: CourseLevel;
};

export type RecommendCourseResponse = {
  courseId: number;
};
