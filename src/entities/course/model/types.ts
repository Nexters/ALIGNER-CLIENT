export interface CourseProgress {
  current: number;
  total: number;
}

export interface TodayWorkoutSummary {
  minutes: number;
  exerciseCount: number;
  setCount: number;
  kcal: number;
  imageSrc: string;
}

export interface PoseTip {
  message: string;
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
}
