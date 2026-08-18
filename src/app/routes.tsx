import type { ReactNode } from "react";
import { ROUTES, type RoutePath } from "@/shared/config/routes";
import { TabLayout } from "./layouts/TabLayout";

import { HomePage } from "@/pages/home";
import { OnboardingPage } from "@/pages/onboarding";
import { CourseRecommendationPage } from "@/pages/course-recommendation";
import { DailyRoutinePage } from "@/pages/daily-routine";
import { ExerciseDetailPage } from "@/pages/exercise-detail";
import { Login } from "@/pages/login/ui/Login";
import { PoseChallengePage } from "@/pages/pose-challenge";
import { ScreeningPage } from "@/pages/screening";
import { MyPage } from "@/pages/my";
import { CompletePage } from "@/pages/complete";
import { MyEditPage } from "@/pages/my-edit";

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
      { path: ROUTES.courseRecommendation, element: <CourseRecommendationPage /> },
      { path: ROUTES.screening, element: <ScreeningPage /> },
      { path: ROUTES.dailyRoutine, element: <DailyRoutinePage /> },
      { path: ROUTES.dailyRoutineExercise, element: <ExerciseDetailPage /> },
      { path: ROUTES.poseChallenge, element: <PoseChallengePage /> },
      { path: ROUTES.complete, element: <CompletePage /> },
      { path: ROUTES.myEdit, element: <MyEditPage /> },
    ],
  },
};
