import { api } from "@/shared/api";
import type { TodayCourseResponse } from "./types";

export function getTodayCourse() {
  return api.get<TodayCourseResponse>("courses/today");
}
