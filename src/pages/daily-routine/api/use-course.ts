import { useQuery } from "@tanstack/react-query";
import { courseDetailQueryKey } from "@/entities/course";
import { getCourse } from "./get-course";

export function useCourse(courseId: number | null) {
  return useQuery({
    queryKey: courseDetailQueryKey(courseId as number),
    queryFn: () => getCourse(courseId as number),
    enabled: courseId !== null,
    retry: false,
  });
}
