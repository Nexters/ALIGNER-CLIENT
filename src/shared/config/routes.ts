export const ROUTES = {
  home: "/",
  login: "/login",
  my: "my",
  dailyRoutine: "/daily-routine",
  dailyRoutineExercise: "/daily-routine/:exerciseId",
  poseChallenge: "/pose-challenge",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export function toDailyRoutineExercisePath(exerciseId: string) {
  return `/daily-routine/${exerciseId}`;
}
