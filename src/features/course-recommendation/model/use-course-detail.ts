import { useQuery } from "@tanstack/react-query";
import { courseDetailQueryKey } from "@/entities/course";
import { getCourseDetail } from "../api/course-api";

export function useCourseDetail(courseId: number) {
  return useQuery({
    queryKey: courseDetailQueryKey(courseId),
    queryFn: () => getCourseDetail(courseId),
  });
}
