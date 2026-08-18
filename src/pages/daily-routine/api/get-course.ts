import { api } from "@/shared/api";
import type { CourseDetailResponse } from "./types";

export function getCourse(courseId: number) {
  return api.get<CourseDetailResponse>(`courses/${courseId}`);
}
