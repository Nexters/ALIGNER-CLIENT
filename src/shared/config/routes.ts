export const ROUTES = {
  home: "/",
  onboarding: "/onboarding",
  login: "/login",
  loginCallback: "/oauth/kakao",
  my: "my",
  courseRecommendation: "/course-recommendation",
  screening: "/screening",
  dailyRoutine: "/daily-routine",
  dailyRoutineExercise: "/daily-routine/:exerciseId",
  poseChallenge: "/pose-challenge",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export function toDailyRoutineExercisePath(exerciseId: string) {
  return `/daily-routine/${exerciseId}`;
}

export function createStepPath<Step extends string>(basePath: RoutePath) {
  return (step: Step) => `${basePath}?step=${step}`;
}
