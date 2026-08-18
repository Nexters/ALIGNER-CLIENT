import type { MuscleName } from "@/shared/ui/muscle-diagram";

export interface CourseProgress {
  current: number;
  total: number;
}

export interface TodayWorkoutSummary {
  /** 운동 하나라도 시간을 모르면 null. 화면은 "-"로 표기한다 */
  minutes: number | null;
  exerciseCount: number;
  setCount: number;
  /** 서버가 몸무게·MET 정보 부족으로 계산하지 못하면 null. 화면은 "-"로 표기한다 */
  kcal: number | null;
  imageSrc: string;
}

export interface PoseTip {
  message: string;
}

/** 운동 가이드에서 신체 부위를 고를 때 쓰는 탭 목록 */
export type ExerciseBodyPart = "가슴" | "코어" | "허리" | "골반";

/** 특정 신체 부위를 선택했을 때 보여줄 운동 가이드 콘텐츠 */
export interface ExerciseGuide {
  bodyPart: ExerciseBodyPart;
  /** MuscleDiagram에 하이라이트로 표시할 근육 이름 목록 */
  highlightedMuscles: MuscleName[];
  tip: string;
}

/** 데일리 루틴 "코스 순서" 리스트에 나열되는 개별 동작 */
export interface Exercise {
  id: string;
  name: string;
  /** 예: "가동성 웜업", "핵심 자세" */
  category: string;
  /** 예: "1세트/2분" */
  setInfo: string;
  kcal: number;
  imageSrc: string;
  /** 예: "하", "중", "상" */
  difficulty: string;
  /** 신체 부위별 운동 가이드. 현재 디자인된 부위만 채워진다 */
  guides: ExerciseGuide[];
}
