import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/shared/config/routes";
import { getBodyParts, getLatestScreeningResult } from "../api/screening-api";
import { deriveWeakBodyParts } from "../lib/derive-weak-body-parts";
import { screeningStepPath } from "../model/screening-steps";

export function useGoToBodyPartStep() {
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const goToBodyPartStep = async () => {
    setIsPending(true);
    try {
      const [result, bodyParts] = await Promise.all([getLatestScreeningResult(), getBodyParts()]);
      const weakBodyParts = deriveWeakBodyParts(result.causes, bodyParts);
      navigate(screeningStepPath("body-part"), { state: { bodyParts: weakBodyParts } });
    } catch {
      // 진단 이력이 없으면(404) 서버가 결과를 못 내려준다 — 온보딩부터 다시 시키면 진단이 제출된다.
      navigate(ROUTES.onboarding);
    } finally {
      setIsPending(false);
    }
  };

  return { goToBodyPartStep, isPending };
}
