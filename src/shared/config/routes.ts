export const ROUTES = {
  home: "/",
  login: "/login",
  my: "my",
  onboarding: "/onboarding",
  screening: "/screening",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
