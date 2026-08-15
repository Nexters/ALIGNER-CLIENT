import type { CourseProgress } from "./types";

// TODO: 실제 API 연동 전까지의 목데이터. 홈/데일리 루틴이 완료 여부를 같이 봐야 해서 여기서 공유한다.
// 서버가 완료 시각을 따로 내려주지 않는다 — progress 자체가 "당일" 기준으로 매일 자정에 초기화되어 내려오므로,
// 클라이언트는 current/total만 보고 완료 여부를 판단하면 된다.
export const MOCK_COURSE_PROGRESS: CourseProgress = { current: 6, total: 6 };
