import { useQuery } from "@tanstack/react-query";
import { getCourse } from "./get-course";

export function useCourse(courseId: number | null) {
  return useQuery({
    queryKey: ["courses", courseId] as const,
    queryFn: () => getCourse(courseId as number),
    enabled: courseId !== null,
    retry: false,
  });
}
