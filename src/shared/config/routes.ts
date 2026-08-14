export const ROUTES = {
  home: "/",
  onboarding: "/onboarding",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

export function createStepPath<Step extends string>(basePath: RoutePath) {
  return (step: Step) => `${basePath}?step=${step}`;
}
