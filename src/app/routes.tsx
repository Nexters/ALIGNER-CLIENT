import type { ReactNode } from "react";
import { ROUTES, type RoutePath } from "@/shared/config/routes";
import { TabLayout } from "./layouts/TabLayout";
import { RequireAccessState } from "./model/RequireAccessState";

import { CompletePage } from "@/pages/complete";
import { CourseRecommendationPage } from "@/pages/course-recommendation";
import { DailyRoutinePage } from "@/pages/daily-routine";
import { ExerciseDetailPage } from "@/pages/exercise-detail";
import { HomePage } from "@/pages/home";
import { Login, LoginCallback } from "@/pages/login";
import { MyPage } from "@/pages/my";
import { MyEditPage } from "@/pages/my-edit";
import { OnboardingPage } from "@/pages/onboarding";
import { PoseChallengePage } from "@/pages/pose-challenge";
import { ScreeningPage } from "@/pages/screening";
import { SessionPlayerPage } from "@/pages/session";

type AppRoute = {
  path: RoutePath;
  element: ReactNode;
};

type RouteGroup = {
  guard: ReactNode | undefined;
  layout: ReactNode | undefined;
  paths: AppRoute[];
};

export const APP_ROUTES: Record<
  "login" | "loginCallback" | "onboarding" | "screening" | "tab" | "ready",
  RouteGroup
> = {
  // 로그인이 안 되어 있을 때만 보여준다 — 이미 로그인돼 있으면 온보딩/스크리닝/홈 중 맞는 곳으로 보낸다.
  login: {
    guard: <RequireAccessState allow={["login"]} />,
    layout: undefined,
    paths: [{ path: ROUTES.login, element: <Login /> }],
  },
  // 카카오 인가 코드 교환용 콜백 — 로그인 진행 중이라 인증 상태를 아직 확정할 수 없으니 가드하지 않는다.
  loginCallback: {
    guard: undefined,
    layout: undefined,
    paths: [{ path: ROUTES.loginCallback, element: <LoginCallback /> }],
  },
  // 프로필(키/몸무게/운동 경력)이 없을 때만 보여준다.
  onboarding: {
    guard: <RequireAccessState allow={["onboarding"]} />,
    layout: undefined,
    paths: [{ path: ROUTES.onboarding, element: <OnboardingPage /> }],
  },
  // 첫 진단이 없을 때 + 이미 다 끝난 회원이 "난이도 조정하기"로 재방문할 때(MuscleTargetCard) 둘 다 허용한다.
  screening: {
    guard: <RequireAccessState allow={["screening", "ready"]} />,
    layout: undefined,
    paths: [{ path: ROUTES.screening, element: <ScreeningPage /> }],
  },
  // 로그인 + 프로필 + 자가진단(부위 선택 포함)까지 모두 끝났을 때만 들어올 수 있다.
  tab: {
    guard: <RequireAccessState allow={["ready"]} />,
    layout: <TabLayout />,
    paths: [
      { path: ROUTES.home, element: <HomePage /> },
      { path: ROUTES.my, element: <MyPage /> },
    ],
  },
  ready: {
    guard: <RequireAccessState allow={["ready"]} />,
    layout: undefined,
    paths: [
      { path: ROUTES.courseRecommendation, element: <CourseRecommendationPage /> },
      { path: ROUTES.dailyRoutine, element: <DailyRoutinePage /> },
      { path: ROUTES.dailyRoutineExercise, element: <ExerciseDetailPage /> },
      { path: ROUTES.poseChallenge, element: <PoseChallengePage /> },
      { path: ROUTES.session, element: <SessionPlayerPage /> },
      { path: ROUTES.complete, element: <CompletePage /> },
      { path: ROUTES.myEdit, element: <MyEditPage /> },
    ],
  },
};
