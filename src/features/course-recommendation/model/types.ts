/** `GET /courses/{courseId}`(`CourseDetailResponse`)를 화면이 쓰기 좋은 모양으로 옮긴 도메인 타입 */
export type CourseStepExercise = {
  name: string;
  /** 운동 썸네일. 로컬 이미지 라이브러리가 없어 아직 항상 null이다. 없으면 플레이스홀더로 그린다 */
  imageAssetKey: string | null;
  category: string | null;
};

export type CourseStep = {
  stepOrder: number;
  exercises: CourseStepExercise[];
};

export type Course = {
  targetPoseName: string;
  /** 히어로 카드 배경 이미지. 로컬 자세 이미지로 이미 해석된 값이다 */
  targetPoseImageAssetKey: string | null;
  totalStepCount: number;
  exerciseCount: number;
  totalSetCount: number;
  /** 예상 수행 시간(초) */
  estimatedDurationSeconds: number | null;
  estimatedKcal: number | null;
  /** stepOrder 오름차순 */
  steps: CourseStep[];
};
