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
  /** 오늘의 동작을 이미 완료했는지. true면 "내일 운동 미리보기"로 CTA가 바뀐다 */
  isCompleted: boolean;
}

export interface PoseTip {
  message: string;
}
