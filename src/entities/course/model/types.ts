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
