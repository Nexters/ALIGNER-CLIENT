import type { ReactNode } from "react";
import { HomePage } from "@/pages/home";
import { Login, LoginCallback } from "@/pages/login";
import { OnboardingPage } from "@/pages/onboarding";
import { ROUTES, type RoutePath } from "@/shared/config/routes";
import { TabLayout } from "./layouts/TabLayout";

import { MyPage } from "@/pages/my";

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
      { path: ROUTES.my, element: <MyPage /> },
    ],
  },
  bare: {
    layout: undefined,
    paths: [
      { path: ROUTES.login, element: <Login /> },
      { path: ROUTES.loginCallback, element: <LoginCallback /> },
      { path: ROUTES.onboarding, element: <OnboardingPage /> },
    ],
  },
};
