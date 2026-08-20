import { useId, type ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";
import {
  getMuscleDiagramViewData,
  MUSCLE_DIAGRAM_FRAMES,
  type MuscleDiagramView,
  type MuscleDiagramZoom,
  type MuscleName,
} from "./data";

export interface MuscleDiagramProps extends Omit<ComponentProps<"svg">, "viewBox"> {
  /** 하이라이트(primary-500)로 표시할 근육 이름 목록. 없으면 기본 색으로만 표시된다 */
  highlightedMuscles?: MuscleName[];
  /** 인체 앞/뒷면. 기본값 "front" */
  view?: MuscleDiagramView;
  /** 카메라 프레이밍. "upperBody"는 어깨~골반 구간이 부모 컨테이너를 채우도록 확대·이동한다.
   * 항상 전신을 그대로 그린 뒤 퍼센트로 확대하므로, 부모가 `relative overflow-hidden`이어야
   * 실루엣이 뷰박스 경계가 아니라 컨테이너 테두리에서만 잘린다. */
  zoom?: MuscleDiagramZoom;
}

export default function MuscleDiagram({
  highlightedMuscles = [],
  view = "front",
  zoom = "full",
  className,
  style,
  ...props
}: MuscleDiagramProps) {
  const glowFilterId = useId();
  const frame = MUSCLE_DIAGRAM_FRAMES[zoom];
  const isCropped = zoom !== "full";
  const { viewBox, basePath, decorationPaths, muscleGroups } = getMuscleDiagramViewData(view);

  return (
    <svg
      viewBox={viewBox}
      fill="none"
      className={cn(
        "w-auto",
        isCropped ? "absolute left-1/2 -translate-x-1/2" : "h-full",
        className,
      )}
      style={{
        ...(isCropped && { height: `${frame.heightPercent}%`, top: `${frame.topPercent}%` }),
        ...style,
      }}
      {...props}
    >
      <defs>
        <filter id={glowFilterId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <path d={basePath} className="fill-tertiary-300" />

      {decorationPaths.map(({ x, y, d }, index) => (
        <g key={index} transform={`translate(${x} ${y})`} className="fill-tertiary-100">
          <path d={d} />
        </g>
      ))}

      {/* 하이라이트된 근육 뒤에 흐릿한 화이트 글로우를 먼저 깔아 Figma의 "뒤(블러) + 앞(단색)" 2겹 강조 효과를 재현한다 */}
      {muscleGroups
        .filter(({ name }) => highlightedMuscles.includes(name))
        .map(({ name, x, y, paths }, index) => (
          <g
            key={`${name}-glow-${index}`}
            transform={`translate(${x} ${y})`}
            fill="white"
            opacity={0.5}
            filter={`url(#${glowFilterId})`}
          >
            {paths.map((d, pathIndex) => (
              <path key={pathIndex} d={d} />
            ))}
          </g>
        ))}

      {muscleGroups.map(({ name, x, y, paths }, index) => {
        const isHighlighted = highlightedMuscles.includes(name);
        return (
          <g
            key={`${name}-${index}`}
            data-muscle={name}
            transform={`translate(${x} ${y})`}
            className={isHighlighted ? "fill-primary-500" : "fill-tertiary-100"}
          >
            {paths.map((d, pathIndex) => (
              <path key={pathIndex} d={d} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
