import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMemberProfile } from "@/entities/member";
import { bodyPartsQueryKey, screeningResultQueryKey } from "@/entities/screening";
import { ROUTES } from "@/shared/config/routes";
import { CTAButton } from "@/shared/ui/button";
import { getBodyParts, getLatestScreeningResult } from "../api/screening-api";
import ScanningMannequin from "../components/ScanningMannequin";
import { deriveWeakBodyParts } from "../lib/derive-weak-body-parts";
import type { DiagnosisStatus } from "../model/diagnosis-status";
import { screeningStepPath } from "../model/screening-steps";

const MIN_ANALYZING_MS = 3000;

function withMinDelay<T>(task: Promise<T>, minDelayMs: number): Promise<T> {
  const minDelay = new Promise<void>((resolve) => setTimeout(resolve, minDelayMs));
  return Promise.all([task, minDelay]).then(([result]) => result);
}

export default function DiagnosisStep() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<DiagnosisStatus>({ kind: "loading" });
  const { data: member } = useMemberProfile();
  const nickname = member?.nickname ?? "";

  useEffect(() => {
    let cancelled = false;

    withMinDelay(
      Promise.all([
        // 온보딩 제출(POST /screening/results) 응답을 그대로 캐시에 심어둔 경우 재요청하지 않는다
        queryClient.fetchQuery({
          queryKey: screeningResultQueryKey(),
          queryFn: getLatestScreeningResult,
          staleTime: 10_000,
        }),
        // 고정 참조 데이터라 앱 시작 시 미리 당겨둔 캐시를 그대로 쓴다
        queryClient.fetchQuery({
          queryKey: bodyPartsQueryKey(),
          queryFn: getBodyParts,
          staleTime: Infinity,
        }),
      ]),
      MIN_ANALYZING_MS,
    )
      .then(([result, bodyParts]) => {
        if (cancelled) return;
        setStatus({ kind: "result", result, bodyParts });
      })
      .catch(() => {
        if (cancelled) return;

        // 진단 이력이 없으면(404) 서버가 결과를 못 내려준다 — 온보딩부터 다시 시키면 진단이 제출된다.
        navigate(ROUTES.onboarding, { replace: true });
      });

    return () => {
      cancelled = true;
    };
  }, [navigate, queryClient]);

  const weakBodyParts =
    status.kind === "result"
      ? deriveWeakBodyParts(status.result.causes ?? [], status.bodyParts)
      : [];

  return (
    <div className="flex h-full w-full flex-col pt-[9.3rem] gap-[5.3rem]">
      <h1 className="typo-title-2-5-emphasized w-full px-[2rem] text-black">
        <span key={status.kind} className="animate-fade-in block">
          {status.kind === "result" ? (
            <>
              {nickname}님은 {weakBodyParts.map((part) => part.name).join(", ")} 근육이
              <br />
              약한것으로 분석돼요
            </>
          ) : (
            <>
              {nickname}님의 근육 상태를
              <br />
              분석중이에요
            </>
          )}
        </span>
      </h1>
      <ScanningMannequin
        status={status.kind}
        markerCodes={weakBodyParts.map((part) => part.bodyPartCode)}
      />
      {status.kind === "result" && (
        <CTAButton fixed className="animate-fade-in">
          <CTAButton.Single
            onClick={() =>
              navigate(screeningStepPath("body-part"), {
                state: { bodyParts: weakBodyParts },
                replace: true,
              })
            }
          >
            다음
          </CTAButton.Single>
        </CTAButton>
      )}
    </div>
  );
}
