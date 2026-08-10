export const ROUTES = {
  home: "/",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
