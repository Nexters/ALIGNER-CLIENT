export const ROUTES = {
  home: "/",
  login: "/login",
  my: "my",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
