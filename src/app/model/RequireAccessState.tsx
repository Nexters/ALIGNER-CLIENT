import { Navigate, Outlet } from "react-router";
import { ROUTES, type RoutePath } from "@/shared/config/routes";
import { useAccessState, type AccessState } from "./use-access-state";

type RequiredAccessState = Exclude<AccessState, "checking">;

const TARGET_ROUTE: Record<RequiredAccessState, RoutePath> = {
  login: ROUTES.login,
  onboarding: ROUTES.onboarding,
  screening: ROUTES.screening,
  ready: ROUTES.home,
};

type RequireAccessStateProps = {
  allow: RequiredAccessState[];
};

export function RequireAccessState({ allow }: RequireAccessStateProps) {
  const accessState = useAccessState();

  if (accessState === "checking") return null;
  if (!allow.includes(accessState)) return <Navigate to={TARGET_ROUTE[accessState]} replace />;

  return <Outlet />;
}
