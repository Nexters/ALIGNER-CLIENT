import type { CourseProgress } from "./types";

// 서버가 완료 시각을 따로 내려주지 않는다 — progress 자체가 "당일" 기준으로 매일 자정에
// 초기화되어 내려오므로, current===total이면 곧 "당일" 완료로 취급해도 된다.
export function isCourseCompleted(progress: CourseProgress): boolean {
  return progress.current >= progress.total;
}

// API가 "휠"/"휠 자세"/"반 보트"처럼 "자세" 접미사·띄어쓰기를 섞어 내려줄 수 있어 정규화한다.
// PoseTipCard 문구 조회 키로 쓴다(이미지 매핑은 assetKey를 쓰므로 여기 관여하지 않는다 — ADR-0004).
export function normalizePoseName(targetPoseName: string): string {
  return targetPoseName.replace(/\s*자세$/, "").replace(/\s+/g, "");
}
