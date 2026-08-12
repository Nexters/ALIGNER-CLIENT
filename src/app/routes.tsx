import type { ReactNode } from "react";
import { ROUTES, type RoutePath } from "@/shared/config/routes";
import { TabLayout } from "./layouts/TabLayout";

import { HomePage } from "@/pages/home";
import { Login } from "@/pages/login/ui/Login";

type AppRoute = {
  path: RoutePath;
  element: ReactNode;
};

type RouteGroup = {
  layout: ReactNode | undefined;
  paths: AppRoute[];
};

export const APP_ROUTES: Record<"tab" | "bare", RouteGroup> = {
  tab: {
    layout: <TabLayout />,
    paths: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.my, element: <div /> },
    ],
  },
  bare: {
    layout: undefined,
    paths: [{ path: ROUTES.login, element: <Login /> },],
  },
};
