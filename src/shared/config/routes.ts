export const ROUTES = {
  home: "/",
  onboarding: "/onboarding",
  login: "/login",
  my: "my",
  courseRecommendation: "/course-recommendation",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export function createStepPath<Step extends string>(basePath: RoutePath) {
  return (step: Step) => `${basePath}?step=${step}`;
}
