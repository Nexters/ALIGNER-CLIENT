import type { BodyPartCode } from "../constants/body-parts";

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
