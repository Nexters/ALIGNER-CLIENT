import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CTAButton } from "@/shared/ui/button";
import { getBodyParts, getLatestScreeningResult } from "../api/screening-api";
import ScanningMannequin from "../components/ScanningMannequin";
import { deriveWeakBodyParts } from "../lib/derive-weak-body-parts";
import { withMinDelay } from "../lib/with-min-delay";
import type { DiagnosisStatus } from "../model/diagnosis-status";
import { screeningStepPath } from "../model/screening-steps";

const MIN_ANALYZING_MS = 3000;

export default function DiagnosisStep() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<DiagnosisStatus>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;

    withMinDelay(Promise.all([getLatestScreeningResult(), getBodyParts()]), MIN_ANALYZING_MS)
      .then(([result, bodyParts]) => {
        if (cancelled) return;
        setStatus({ kind: "result", result, bodyParts });
      })
      .catch(() => {
        if (cancelled) return;

        // TODO: 실제 API 연동 시 parseApiError로 code/message를 읽어
        // 404 SCREENING_RESULT_NOT_FOUND면 ROUTES.onboarding으로 리다이렉트
      });

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const weakBodyParts =
    status.kind === "result" ? deriveWeakBodyParts(status.result.causes, status.bodyParts) : [];

  return (
    <div className="flex h-full w-full flex-col pt-[9.3rem] gap-[5.3rem]">
      <h1 className="typo-title-2-5-emphasized w-full px-[2rem] text-black">
        <span key={status.kind} className="animate-fade-in block">
          {status.kind === "result" ? (
            <>
              ~님은 {weakBodyParts.map((part) => part.name).join(", ")} 근육이
              <br />
              약한것으로 분석돼요
            </>
          ) : (
            <>
              ~님의 근육 상태를
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
                state: { bodyParts: status.bodyParts },
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
