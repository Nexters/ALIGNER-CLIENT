import type { ReactNode } from "react";
import { HomePage } from "@/pages/home";
import { ROUTES, type RoutePath } from "@/shared/config/routes";

type AppRoute = {
  path: RoutePath;
  element: ReactNode;
};

export const APP_ROUTES: AppRoute[] = [{ path: ROUTES.home, element: <HomePage /> }];
