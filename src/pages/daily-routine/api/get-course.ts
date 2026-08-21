import { coursesApi } from "@/shared/api";

export async function getCourse(courseId: number) {
  const response = await coursesApi.getCourseDetail(courseId);
  return response.data;
}
