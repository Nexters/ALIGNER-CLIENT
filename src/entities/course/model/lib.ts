import type { CourseProgress } from "./types";

// 서버가 완료 시각을 따로 내려주지 않는다 — progress 자체가 "당일" 기준으로 매일 자정에
// 초기화되어 내려오므로, current===total이면 곧 "당일" 완료로 취급해도 된다.
export function isCourseCompleted(progress: CourseProgress): boolean {
  return progress.current >= progress.total;
}
