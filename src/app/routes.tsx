import type { ReactNode } from "react";
import { ROUTES, type RoutePath } from "@/shared/config/routes";

import { HomePage } from "@/pages/home";
import { Login } from "@/pages/login/ui/Login";

type AppRoute = {
  path: RoutePath;
  element: ReactNode;
};

export const APP_ROUTES: AppRoute[] = [
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.login, element: <Login /> },
];
