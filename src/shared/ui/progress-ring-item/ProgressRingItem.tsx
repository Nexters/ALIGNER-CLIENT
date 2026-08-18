import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

/** 링을 그리는 좌표계. 바깥 지름 102px, 링 두께 4px이라 중심 반지름은 49px이다. */
const RING_SIZE = 102;
const RING_CENTER = RING_SIZE / 2;
const RING_STROKE = 4;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;

type RingState = "idle" | "progress" | "complete";

const RING_BACKGROUND: Record<RingState, string> = {
  idle: "bg-gray-96",
  progress: "bg-border-base",
  complete: "bg-primary-100",
};

/**
 * 상태별로 겹쳐 그릴 이미지 레이어의 클래스.
 * idle은 Figma가 같은 이미지를 두 겹(opacity 60 + mix-blend-difference 40)으로 쌓아 회색으로 죽인다.
 */
const IMAGE_LAYERS: Record<RingState, readonly string[]> = {
  idle: ["opacity-60", "opacity-40 mix-blend-difference"],
  progress: ["opacity-70"],
  complete: [""],
};

// 각도(0=12시, 시계방향)를 링 위의 좌표로 변환해 반환한다.
function pointOnRing(angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: RING_CENTER + RING_RADIUS * Math.cos(angleRad),
    y: RING_CENTER + RING_RADIUS * Math.sin(angleRad),
  };
}

// 12시에서 시계방향으로 sweepDeg만큼 도는 원호의 SVG path d 값을 반환한다. (360도는 <circle>로 처리)
function describeArc(sweepDeg: number) {
  const start = pointOnRing(0);
  const end = pointOnRing(sweepDeg);
  const largeArcFlag = sweepDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${RING_RADIUS} ${RING_RADIUS} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
}

export interface ProgressRingItemProps extends ComponentProps<"div"> {
  /** 없으면 플레이스홀더가 보인다 */
  imageSrc?: string;
  /** 이미지 대체 텍스트 */
  alt: string;
  /** 원 아래에 붙는 이름 */
  label: string;
  /** 현재 단계 */
  current: number;
  /** 전체 단계 수 */
  total: number;
  /**
   * 링 상태. 시작 전(idle)인지, 도전 중(progress)인지, 완성(complete)인지를 직접 받는다 —
   * current===0으로 idle을 추론하면 "도전 시작은 했지만 도장을 아직 못 모은" 경우(current 0인 채로
   * 진행 중)까지 미시작으로 잘못 표시된다.
   */
  status: RingState;
  /** 배지 문구. 문구 조립은 쓰는 쪽 책임이다 (ADR-0002) */
  badgeLabel?: string;
}

export default function ProgressRingItem({
  imageSrc,
  alt,
  label,
  current,
  total,
  status,
  badgeLabel,
  className,
  ...props
}: ProgressRingItemProps) {
  // 0 이하가 들어오면 비율 계산이 NaN이 되어 아크가 깨지므로 최소 1로 잡는다.
  const safeTotal = Math.max(total, 1);
  const filled = Math.min(Math.max(current, 0), safeTotal);
  const state = status;

  return (
    <div className={cn("flex w-[10.2rem] flex-col items-center gap-3", className)} {...props}>
      <div className="relative size-[10.2rem] shrink-0">
        <div
          className={cn(
            "absolute inset-0 rounded-full border-4 border-border-base",
            RING_BACKGROUND[state],
          )}
        />
        {/* 링 두께만큼 안쪽으로 클립해 이미지가 링을 덮지 않게 한다 */}
        <div className="absolute inset-2 overflow-hidden rounded-full">
          {imageSrc ? (
            IMAGE_LAYERS[state].map((layerClassName, index) => (
              <img
                key={index}
                src={imageSrc}
                alt={index === 0 ? alt : ""}
                aria-hidden={index > 0 || undefined}
                className={cn("absolute inset-0 size-full object-contain", layerClassName)}
              />
            ))
          ) : (
            <span className="block size-full bg-media-placeholder" />
          )}
        </div>
        {state !== "idle" && (
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 size-full"
          >
            {state === "complete" ? (
              <circle
                cx={RING_CENTER}
                cy={RING_CENTER}
                r={RING_RADIUS}
                strokeWidth={RING_STROKE}
                className="stroke-primary-500"
              />
            ) : (
              <path
                d={describeArc((filled / safeTotal) * 360)}
                strokeWidth={RING_STROKE}
                className="stroke-primary-500"
              />
            )}
          </svg>
        )}
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <p className="typo-subheadline-emphasized w-full text-center break-words text-gray-10">
          {label}
        </p>
        {state !== "idle" && badgeLabel && (
          <span
            className={cn(
              "typo-caption-2-emphasized rounded-[1.2rem] px-3 py-1",
              state === "complete"
                ? "bg-primary-200 text-primary-900"
                : "bg-tertiary-100 text-tertiary-900",
            )}
          >
            {badgeLabel}
          </span>
        )}
      </div>
    </div>
  );
}
