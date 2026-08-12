export const ROUTES = {
  home: "/",
  login: "/login",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
