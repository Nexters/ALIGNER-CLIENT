export const ROUTES = {
  home: "/",
  onboarding: "/onboarding",
  courseRecommendation: "/course-recommendation",
  screening: "/screening",
  dailyRoutine: "/daily-routine",
  dailyRoutineExercise: "/daily-routine/:exerciseId",
  poseChallenge: "/pose-challenge",
  login: "/login",
  my: "my",
  complete: "complete/:sessionId",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export function toDailyRoutineExercisePath(exerciseId: string) {
  return `/daily-routine/${exerciseId}`;
}

// courseId는 경로가 아니라 쿼리로 넘긴다 — "/daily-routine/:exerciseId"(운동 상세) 경로와 겹치지 않기 위해서다.
export function toDailyRoutinePath(courseId: number) {
  return `${ROUTES.dailyRoutine}?courseId=${courseId}`;
}

export function createStepPath<Step extends string>(basePath: RoutePath) {
  return (step: Step) => `${basePath}?step=${step}`;
}
