export const ROUTES = {
  home: "/",
  onboarding: "/onboarding",
  loginCallback: "/oauth/kakao",
  courseRecommendation: "/course-recommendation/:courseId",
  screening: "/screening",
  dailyRoutine: "/daily-routine",
  dailyRoutineExercise: "/daily-routine/:exerciseId",
  poseChallenge: "/pose-challenge",
  login: "/login",
  my: "my",
  session: "/session/:sessionId",
  complete: "complete/:sessionId",
  myEdit: "/my/edit",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export function toDailyRoutineExercisePath(exerciseId: string) {
  return `/daily-routine/${exerciseId}`;
}

export function toSessionPath(sessionId: number) {
  return `/session/${sessionId}`;
}

export function toCompletePath(sessionId: number) {
  // ROUTES.complete 자체는(다른 곳들과 달리) 앞에 "/"가 없다. navigate()에 상대경로를 그대로 넘기면
  // 현재 위치(/session/:sessionId) 기준으로 해석돼 엉뚱한 곳으로 이동한다 — TabLayout의
  // toAbsolutePath()가 막는 것과 같은 함정이라, 여기서는 절대경로로 만들어 반환한다.
  return `/complete/${sessionId}`;
}

export function toCourseRecommendationPath(courseId: number) {
  return `/course-recommendation/${courseId}`;
}

// courseId는 경로가 아니라 쿼리로 넘긴다 — "/daily-routine/:exerciseId"(운동 상세) 경로와 겹치지 않기 위해서다.
export function toDailyRoutinePath(courseId: number) {
  return `${ROUTES.dailyRoutine}?courseId=${courseId}`;
}

export function createStepPath<Step extends string>(basePath: RoutePath) {
  return (step: Step) => `${basePath}?step=${step}`;
}
