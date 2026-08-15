export const ROUTES = {
  home: "/",
  login: "/login",
  my: "my",
  dailyRoutine: "/daily-routine",
  poseChallenge: "/pose-challenge",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
