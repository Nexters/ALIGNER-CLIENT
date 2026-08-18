import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export interface SequenceItemProps extends ComponentProps<"div"> {
  /** 순번 배지에 표시할 순번 */
  step: number;
  /** 강조해야 하는 줄이면 순번 배지를 강조한다 (rail: 진행 중인 줄 / compact: 핵심 단계) */
  active?: boolean;
  /** 마지막 줄이면 연결선을 그리지 않는다. compact에서는 연결선 자체가 없어 무시된다 */
  isLast?: boolean;
  /** 없으면 플레이스홀더가 보인다 */
  imageSrc?: string;
  /** 이미지 대체 텍스트 */
  alt: string;
  title: string;
  /** 카드 본문. 배열 한 항목이 한 줄이다 */
  descriptions?: string[];
  /** caption 앞에 붙는 아이콘 슬롯. compact에서는 쓰지 않는다 */
  captionIcon?: ReactNode;
  caption?: string;
  /**
   * true면 좌측 순번 레일·연결선 없이 한 줄짜리 컴팩트 카드로 그린다 —
   * 순번 배지가 카드 우측 상단으로 옮겨간다. 기본은 false(레일 레이아웃)
   */
  compact?: boolean;
}

export default function SequenceItem({
  step,
  active = false,
  isLast = false,
  imageSrc,
  alt,
  title,
  descriptions,
  captionIcon,
  caption,
  compact = false,
  className,
  ...props
}: SequenceItemProps) {
  const thumb = imageSrc ? (
    <img src={imageSrc} alt={alt} className="size-full object-cover" />
  ) : (
    <span className="block size-full bg-media-placeholder" />
  );

  if (compact) {
    return (
      <div
        className={cn(
          "flex w-full items-center gap-[1.8rem] rounded-[2.8rem] bg-bg-surface p-[1.2rem]",
          className,
        )}
        {...props}
      >
        <div className="size-[7.4rem] shrink-0 overflow-hidden rounded-[2.4rem]">{thumb}</div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="text-[2rem] leading-[1.4] font-bold tracking-[-0.0045rem] text-black">
            {title}
          </p>
          {descriptions && descriptions.length > 0 && (
            <div className="flex flex-col text-gray-10">
              {descriptions.map((description, index) => (
                <p
                  key={index}
                  className="text-[1.4rem] leading-[2.4rem] font-medium tracking-[-0.0028rem]"
                >
                  {description}
                </p>
              ))}
            </div>
          )}
        </div>

        <span
          className={cn(
            "flex size-[2.4rem] shrink-0 items-center justify-center self-start rounded-full text-[1.4rem] leading-[1.4] font-bold tracking-[-0.0023rem]",
            active ? "bg-accent-base text-ink-strong" : "bg-gray-98 text-gray-50",
          )}
        >
          {step}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex w-full items-stretch gap-2", className)} {...props}>
      {/* 연결선이 다음 줄까지 이어져야 해서 줄 간격을 카드 margin으로 이 컴포넌트가 소유한다 */}
      <div className="flex w-[2.2rem] shrink-0 flex-col items-center">
        <span
          className={cn(
            "flex size-[2.2rem] shrink-0 items-center justify-center rounded-[0.8rem] text-[1.2rem] leading-[1.4] font-bold tracking-[-0.0024rem] text-white",
            active ? "bg-gray-10" : "bg-gray-70",
          )}
        >
          {step}
        </span>
        {!isLast && (
          <span
            aria-hidden="true"
            className={cn(
              "w-0 flex-1 border-l border-dashed",
              active ? "border-gray-10" : "border-gray-70",
            )}
          />
        )}
      </div>

      <div
        className={cn(
          "flex min-w-0 flex-1 items-end gap-4 rounded-[2.8rem] bg-bg-surface px-[1.3rem] py-4",
          !isLast && "mb-5",
        )}
      >
        <div className="h-[11.6rem] w-[12.8rem] shrink-0 overflow-hidden rounded-[2rem]">
          {thumb}
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
          <div className="flex flex-col gap-3">
            <p className="text-[1.6rem] leading-[2.4rem] font-bold tracking-[-0.0032rem] text-black">
              {title}
            </p>
            {descriptions && descriptions.length > 0 && (
              <div className="flex flex-col text-gray-10">
                {descriptions.map((description, index) => (
                  <p
                    key={index}
                    className="text-[1.4rem] leading-[2.4rem] font-medium tracking-[-0.0028rem]"
                  >
                    {description}
                  </p>
                ))}
              </div>
            )}
          </div>
          {(captionIcon || caption) && (
            <div className="flex items-center gap-2 text-gray-50">
              {captionIcon && <span className="flex shrink-0 items-center">{captionIcon}</span>}
              {caption && (
                <span className="text-[1.4rem] leading-[2.4rem] font-medium tracking-[-0.0028rem]">
                  {caption}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
