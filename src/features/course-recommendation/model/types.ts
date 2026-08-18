// TODO: API 연동 시, 삭제
/** Swagger `CourseDetailResponse`(`GET /courses/{courseId}`)의 필드명을 그대로 따른다. API 호출은 하지 않는다 */
export type CourseStepExercise = {
  name: string;
  /** 운동 이미지 asset 키. URL이 아니다. 없으면 플레이스홀더로 그린다 */
  imageAssetKey: string | null;
  category: string | null;
};

export type CourseStep = {
  stepOrder: number;
  exercises: CourseStepExercise[];
};

export type Course = {
  targetPoseName: string;
  /** 목표 자세 이미지 asset 키. 히어로 카드 배경에 쓴다. URL이 아니다 */
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
