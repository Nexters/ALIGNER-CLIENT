import { useQuery } from "@tanstack/react-query";
import { coursesApi } from "@/shared/api";

export const TODAY_COURSE_QUERY_KEY = ["courses", "today"] as const;

export function useTodayCourse() {
  return useQuery({
    queryKey: TODAY_COURSE_QUERY_KEY,
    queryFn: async () => {
      const response = await coursesApi.getTodayCourse();
      return response.data;
    },
    retry: false,
  });
}
