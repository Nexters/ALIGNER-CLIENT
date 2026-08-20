import { useEffect, useState } from "react";
import sessionTimerBackdrop from "@/shared/assets/imgs/session/timer-backdrop.svg";
import { IconButton } from "@/shared/ui/button";
import { NextIcon, PreviousIcon } from "@/shared/ui/icons";

// Figma의 실제 링(Ellipse 4403 Stroke)은 곡선을 따라가는 점선이 아니라, 시계 눈금처럼
// 중심을 향해 뻗은 직선 tick으로 이루어져 있다. viewBox는 168x84(원본 에셋 픽셀 크기)를 그대로 쓴다.
const CENTER_X = 84;
const CENTER_Y = 84;
const OUTER_RADIUS = 80;
const INNER_RADIUS = 68;
const TICK_COUNT = 32;
// 1초 단위로만 갱신하면 갱신 빈도가 totalSeconds에 따라 들쭉날쭉해 보여서, 더 잦은 간격으로 실제 경과 시간을 다시 잰다.
const TICK_INTERVAL_MS = 50;

// -90도=9시, 0도=12시, 90도=3시. 각도가 커질수록 시계방향으로 돈다.
function tickAngle(index: number) {
  return -90 + ((index + 0.5) * 180) / TICK_COUNT;
}

function describeTick(angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    x1: CENTER_X + INNER_RADIUS * cos,
    y1: CENTER_Y + INNER_RADIUS * sin,
    x2: CENTER_X + OUTER_RADIUS * cos,
    y2: CENTER_Y + OUTER_RADIUS * sin,
  };
}

function formatTime(seconds: number) {
  const clamped = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(clamped / 60);
  const rest = clamped % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

interface SessionCountdownTimerProps {
  totalSeconds: number;
  /** 타이머가 0에 도달하면 호출된다 */
  onFinish: () => void;
}

export function SessionCountdownTimer({ totalSeconds, onFinish }: SessionCountdownTimerProps) {
  // 지나간 시간의 비율(0~1). 렌더 중에는 Date.now()나 ref를 직접 읽지 않고(impure),
  // setInterval 콜백 안에서만 갱신한다.
  const [elapsedFraction, setElapsedFraction] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    const timer = setInterval(() => {
      const elapsedSeconds = (Date.now() - startedAt) / 1000;
      if (totalSeconds > 0 && elapsedSeconds >= totalSeconds) {
        clearInterval(timer);
        setElapsedFraction(1);
        onFinish();
        return;
      }
      setElapsedFraction(totalSeconds > 0 ? elapsedSeconds / totalSeconds : 0);
    }, TICK_INTERVAL_MS);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalSeconds]);

  const remainingSeconds = totalSeconds * (1 - elapsedFraction);
  // 왼쪽(9시)에서 오른쪽(3시)으로 tick이 네온으로 채워진다.
  const elapsedAngle = -90 + elapsedFraction * 180;

  return (
    <div className="relative flex w-full items-center justify-center px-[2rem] pt-[4.8rem] pb-[3.2rem]">
      <img
        src={sessionTimerBackdrop}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 size-full"
      />

      <div className="relative z-10 flex w-full items-center justify-center gap-[2.4rem]">
        {/* TODO: 세션 하나 = 동작 하나라 이전/다음이 지금은 할 일이 없다. 용도가 정해지면 연결한다. */}
        <IconButton icon={PreviousIcon} aria-label="이전 동작" className="shrink-0 text-gray-80" />

        <div className="relative h-[10.4rem] w-[20.8rem] shrink-0">
          <svg viewBox="0 0 168 84" fill="none" className="absolute inset-0 size-full">
            {Array.from({ length: TICK_COUNT }, (_, index) => {
              const angle = tickAngle(index);
              const { x1, y1, x2, y2 } = describeTick(angle);
              return (
                <line
                  key={index}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  strokeWidth="3.5"
                  className={angle < elapsedAngle ? "stroke-primary-500" : "stroke-gray-60"}
                />
              );
            })}
          </svg>
          <div className="absolute inset-x-0 bottom-0 flex justify-center">
            <span className="typo-large-title-emphasized text-primary-50">
              {formatTime(remainingSeconds)}
            </span>
          </div>
        </div>

        <IconButton icon={NextIcon} aria-label="다음 동작" className="shrink-0 text-gray-80" />
      </div>
    </div>
  );
}
