import { useQuery } from "@tanstack/react-query";
import { getTodayCourse } from "./get-today-course";

export const TODAY_COURSE_QUERY_KEY = ["courses", "today"] as const;

export function useTodayCourse() {
  return useQuery({
    queryKey: TODAY_COURSE_QUERY_KEY,
    queryFn: getTodayCourse,
    retry: false,
  });
}
