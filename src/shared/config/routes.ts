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

export function createStepPath<Step extends string>(basePath: RoutePath) {
  return (step: Step) => `${basePath}?step=${step}`;
}
