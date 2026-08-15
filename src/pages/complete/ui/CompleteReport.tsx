import { useNavigate } from "react-router";
import { cn } from "@/shared/lib/cn";
import { toWeekdayLabel } from "@/shared/lib/date";
import { CTAButton } from "@/shared/ui/button";
import { CheckMarkGroup } from "@/shared/ui/check-mark";
import { CheckBoldIcon } from "@/shared/ui/icons";
import { ROUTES } from "@/shared/config/routes";

function formatDuration(durationSeconds: number): string {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

export function CompleteReport() {
  const navigate = useNavigate();

  const days = [
    { date: "2026-08-10", achieved: true },
    { date: "2026-08-11", achieved: true },
    { date: "2026-08-12", achieved: true },
    { date: "2026-08-13", achieved: true },
    { date: "2026-08-14", achieved: true },
    { date: "2026-08-15", achieved: false },
    { date: "2026-08-16", achieved: false },
  ];

  const sessionStats = [
    { label: "운동 시간", value: formatDuration(1214) },
    { label: "완료 동작", value: "8개" },
    { label: "소모 칼로리", value: "63kcal" },
  ];

  return (
    <main className="flex min-h-screen flex-col gap-6 pt-8 pb-10 bg-bg-base h-full px-6">
      <div className="flex flex-col items-center justify-center gap-4 rounded-[28px] bg-white p-7 h-[240px]">
        <div
          className="flex size-[56px] items-center justify-center rounded-full bg-accent-base"
          aria-hidden="true"
        >
          <CheckBoldIcon className="size-[26px] text-ink-base" />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h1 className="typo-title-2-emphasized text-ink-strong">오늘의 운동을 마쳤어요</h1>
          <p className="typo-subheadline-emphasized text-gray-60">
            골반 난이도 상 · 파이어로그 로드맵
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-5 rounded-[20px] bg-white p-6">
          <div className="flex items-center gap-3">
            <p className="flex-1 typo-body-emphasized text-ink-strong">파이어로그 해냈어요!</p>
            <span className="rounded-full bg-primary-200 px-[10px] py-2 typo-subheadline-emphasized text-accent-strong">
              1 / 4회
            </span>
          </div>
          <div className="flex w-full gap-2" aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
              <div
                key={index}
                className={cn(
                  "h-3 flex-1 rounded-[4px]",
                  index < 1 ? "bg-accent-base" : "bg-gray-97",
                )}
              />
            ))}
          </div>
        </div>

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
            <p className="flex-1 typo-body-emphasized text-ink-strong">5일 연속 달성 중</p>
            <p className="typo-subheadline-emphasized text-gray-60">이번 주 5 / 7</p>
          </div>
          <CheckMarkGroup className="w-full">
            {days.map(({ date, achieved }) => (
              <CheckMarkGroup.Item key={date} isChecked={achieved} className="flex-1">
                <CheckMarkGroup.Indicator />
                <CheckMarkGroup.Label label={toWeekdayLabel(date)} />
              </CheckMarkGroup.Item>
            ))}
          </CheckMarkGroup>
        </div>
      </div>

      <CTAButton>
        <CTAButton.Single onClick={() => navigate(ROUTES.home)}>홈화면으로 가기</CTAButton.Single>
      </CTAButton>
    </main>
  );
}
