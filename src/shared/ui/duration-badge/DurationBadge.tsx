import { cn } from "@/shared/lib/cn";

const MAX_MINUTES = 60;
const CENTER = 31;
const RADIUS = 30;
const DASH = "0.5 0.5";
// dash 패턴을 반 칸 밀어서 12시 지점에 이음새 점이 정중앙에 오게 한다.
const DASH_OFFSET = 0.25;

// 각도(0=12시, 시계방향)를 링 위의 좌표로 변환해 반환한다.
function polarToCartesian(angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(angleRad),
    y: CENTER + RADIUS * Math.sin(angleRad),
  };
}

// 두 각도 사이를 잇는 원호의 SVG path d 값을 반환한다. (360도 전체는 <circle>로 처리)
function describeArc(startAngle: number, endAngle: number) {
  const start = polarToCartesian(startAngle);
  const end = polarToCartesian(endAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

type DurationBadgeProps = {
  minutes: number;
  className?: string;
};

export default function DurationBadge({ minutes, className }: DurationBadgeProps) {
  if (minutes > MAX_MINUTES) {
    throw new Error(
      `DurationBadge: minutes는 ${MAX_MINUTES} 이하여야 합니다 (받은 값: ${minutes})`,
    );
  }

  // minutes 반올림
  const displayMinutes = Math.round(minutes);

  // 파란 아크 길이는 minutes/60에 비례
  const fraction = Math.max(displayMinutes, 0) / MAX_MINUTES;
  const sweepDeg = fraction * 360;
  const bluePathLength = fraction * 100;
  const grayPathLength = 100 - bluePathLength;

  return (
    <div
      className={cn(
        "inline-flex h-[7.4rem] w-[7.4rem] items-center justify-center rounded-full bg-gray-10 p-[0.6rem]",
        className,
      )}
    >
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 62 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 h-full w-full"
        >
          {sweepDeg > 0 &&
            (sweepDeg >= 360 ? (
              <circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                className="stroke-secondary-200"
                strokeWidth="2"
                strokeDasharray={DASH}
                strokeDashoffset={DASH_OFFSET}
                pathLength={100}
              />
            ) : (
              <path
                d={describeArc(0, sweepDeg)}
                className="stroke-secondary-200"
                strokeWidth="2"
                strokeDasharray={DASH}
                strokeDashoffset={DASH_OFFSET}
                pathLength={bluePathLength}
              />
            ))}
          {sweepDeg < 360 && (
            <path
              d={describeArc(sweepDeg, 360)}
              className="stroke-gray-60"
              strokeWidth="2"
              strokeDasharray={DASH}
              strokeDashoffset={DASH_OFFSET}
              pathLength={grayPathLength}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center px-[1rem] py-[1.4rem] leading-none text-white">
          <span className="flex items-baseline">
            <span className="typo-title-2-5-regular">{displayMinutes}</span>
            <span className="typo-headline-regular">분</span>
          </span>
        </div>
      </div>
    </div>
  );
}
