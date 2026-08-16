import type { MuscleDiagramZoom } from "@/shared/ui/muscle-diagram";
import type { CourseProgress, ExerciseBodyPart } from "./types";

// 서버가 완료 시각을 따로 내려주지 않는다 — progress 자체가 "당일" 기준으로 매일 자정에
// 초기화되어 내려오므로, current===total이면 곧 "당일" 완료로 취급해도 된다.
export function isCourseCompleted(progress: CourseProgress): boolean {
  return progress.current >= progress.total;
}

// TODO: 코어/허리/골반은 아직 확대 프레이밍이 디자인되지 않아 전신으로 대체한다.
export function getMuscleDiagramZoom(bodyPart: ExerciseBodyPart): MuscleDiagramZoom {
  return bodyPart === "가슴" ? "upperBody" : "full";
}
