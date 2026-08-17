import type { ReactNode } from "react";
import { HomePage } from "@/pages/home";
import { OnboardingPage } from "@/pages/onboarding";
import { ROUTES, type RoutePath } from "@/shared/config/routes";
import { TabLayout } from "./layouts/TabLayout";
import { DailyRoutinePage } from "@/pages/daily-routine";
import { ExerciseDetailPage } from "@/pages/exercise-detail";
import { Login } from "@/pages/login/ui/Login";
import { MyPage } from "@/pages/my";
import { PoseChallengePage } from "@/pages/pose-challenge";

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
      { path: ROUTES.onboarding, element: <OnboardingPage /> },
      { path: ROUTES.dailyRoutine, element: <DailyRoutinePage /> },
      { path: ROUTES.dailyRoutineExercise, element: <ExerciseDetailPage /> },
      { path: ROUTES.poseChallenge, element: <PoseChallengePage /> },
    ],
  },
};
