import { useNavigate } from "react-router";
import type { AchievementResponse } from "@/shared/api/generated/data-contracts";
import { useSession } from "@/entities/session";
import { cn } from "@/shared/lib/cn";
import { toWeekdayLabel } from "@/shared/lib/date";
import { ROUTES } from "@/shared/config/routes";
import { CTAButton } from "@/shared/ui/button";
import { CheckMarkGroup } from "@/shared/ui/check-mark";
import { ErrorMessage } from "@/shared/ui/error-message";
import { CheckBoldIcon } from "@/shared/ui/icons";
import { mapSessionReport, type SessionReportView } from "../api/map-session";
import { useAchievements } from "../api/use-achievements";

interface CompleteReportProps {
  sessionId: number;
}

export function CompleteReport({ sessionId }: CompleteReportProps) {
  return (
    <main className="flex min-h-screen flex-col gap-6 pt-8 pb-10 bg-bg-base h-full px-6">
      <CompleteReportContent sessionId={sessionId} />
    </main>
  );
}

function CompleteReportContent({ sessionId }: CompleteReportProps) {
  const navigate = useNavigate();

  const { data: session, error: sessionError, isPending: isSessionPending } = useSession(sessionId);
  const {
    data: achievements,
    error: achievementsError,
    isPending: isAchievementsPending,
  } = useAchievements();

  if (isSessionPending || isAchievementsPending) {
    return null;
  }

  if (sessionError || !session || achievementsError || !achievements) {
    return (
      <ErrorMessage
        message="정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
        className="typo-body-regular text-gray-50 m-auto"
      />
    );
  }

  return (
    <ReportBody
      report={mapSessionReport(session)}
      achievements={achievements}
      onGoHome={() => navigate(ROUTES.home)}
    />
  );
}

interface ReportBodyProps {
  report: SessionReportView;
  achievements: AchievementResponse;
  onGoHome: () => void;
}

function ReportBody({ report, achievements, onGoHome }: ReportBodyProps) {
  const { stamp } = report;
  const sessionStats = [
    { label: "운동 시간", value: report.durationLabel },
    { label: "완료 동작", value: report.completedExerciseLabel },
    { label: "소모 칼로리", value: report.kcalLabel },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] bg-white p-7 h-[240px]">
        <div
          className="flex size-[56px] items-center justify-center rounded-full bg-accent-base"
          aria-hidden="true"
        >
          <CheckBoldIcon className="size-[26px] text-ink-base" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="typo-title-2-emphasized text-ink-strong">오늘의 운동을 마쳤어요</h1>
          <p className="typo-subheadline-emphasized text-gray-60">{report.subtitle}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {stamp && (
          <div className="flex flex-col gap-5 rounded-[20px] bg-white p-6">
            <div className="flex items-center gap-3">
              <p className="flex-1 typo-body-emphasized text-ink-strong">
                {stamp.targetPoseName} 해냈어요!
              </p>
              <span className="rounded-full bg-primary-200 px-[10px] py-2 typo-subheadline-emphasized text-accent-strong">
                {stamp.acquired} / {stamp.required}회
              </span>
            </div>
            <div className="flex w-full gap-2" aria-hidden="true">
              {Array.from({ length: stamp.required }, (_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-3 flex-1 rounded-[4px]",
                    index < stamp.acquired ? "bg-accent-base" : "bg-gray-97",
                  )}
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-4 rounded-[20px] bg-white p-6 text-center">
          {sessionStats.map(({ label, value }) => (
            <div key={label} className="flex flex-1 flex-col items-center gap-2">
              <p className="typo-title-3-emphasized text-ink-strong">{value}</p>
              <p className="typo-caption-1-emphasized text-gray-60">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 rounded-[20px] bg-white p-6">
          <div className="flex items-center gap-3">
            <p className="flex-1 typo-body-emphasized text-ink-strong">
              {achievements.currentStreakDays}일 연속 달성 중
            </p>
            <p className="typo-subheadline-emphasized text-gray-60">
              이번 주 {achievements.weeklyAchievedCount} / {achievements.days?.length ?? 0}
            </p>
          </div>
          <CheckMarkGroup className="w-full">
            {(achievements.days ?? []).map(({ date, achieved }) => (
              <CheckMarkGroup.Item key={date} isChecked={achieved ?? false} className="flex-1">
                <CheckMarkGroup.Indicator />
                <CheckMarkGroup.Label label={toWeekdayLabel(date ?? "")} />
              </CheckMarkGroup.Item>
            ))}
          </CheckMarkGroup>
        </div>
      </div>

      <CTAButton>
        <CTAButton.Single onClick={onGoHome}>홈화면으로 가기</CTAButton.Single>
      </CTAButton>
    </>
  );
}
