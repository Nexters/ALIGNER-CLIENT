import { useQuery } from "@tanstack/react-query";
import { hasCompletedOnboarding, useMemberProfile } from "@/entities/member";
import { isAuthenticated, screeningApi } from "@/shared/api";

export type AccessState = "checking" | "login" | "onboarding" | "screening" | "ready";

const SCREENING_EXISTS_QUERY_KEY = ["screening", "latest", "exists"] as const;

// 진단 이력이 없으면 404다 — 상태 코드를 보지 않고 실패 자체를 "이력 없음"으로 취급한다
// (features/screening-flow/steps/DiagnosisStep.tsx와 동일한 규칙).
async function hasScreeningResult() {
  try {
    await screeningApi.getLatestResult();
    return true;
  } catch {
    return false;
  }
}

// 앱 전체 라우트가 공유하는 상태 머신: 인증 → 프로필(온보딩) → 자가진단(부위 선택 포함) 순으로 확인한다.
export function useAccessState(): AccessState {
  const authenticated = isAuthenticated();
  const { data: member, isPending: isMemberPending } = useMemberProfile({
    enabled: authenticated,
  });
  const isOnboarded = member != null && hasCompletedOnboarding(member);
  // 진단 결과를 본 뒤에 고르는 값이라 스크리닝 자체를 안 했어도, 했는데 아직 안 골랐어도 null이다.
  const isBodyPartChosen = member?.reinforcementBodyPartCode != null;

  const { data: hasScreened, isPending: isScreeningPending } = useQuery({
    queryKey: SCREENING_EXISTS_QUERY_KEY,
    queryFn: hasScreeningResult,
    enabled: authenticated && isOnboarded,
  });

  if (!authenticated) return "login";
  if (isMemberPending) return "checking";
  if (!isOnboarded) return "onboarding";
  if (isScreeningPending) return "checking";
  if (hasScreened === false || !isBodyPartChosen) return "screening";
  return "ready";
}
