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
