import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export interface SequenceItemProps extends ComponentProps<"div"> {
  /** 좌측 레일에 표시할 순번 */
  step: number;
  /** 진행 중인 줄이면 순번 배지를 강조한다 */
  active?: boolean;
  /** 마지막 줄이면 연결선을 그리지 않는다 */
  isLast?: boolean;
  /** 없으면 플레이스홀더가 보인다 */
  imageSrc?: string;
  /** 이미지 대체 텍스트 */
  alt: string;
  title: string;
  /** 카드 본문. 배열 한 항목이 한 줄이다 */
  descriptions?: string[];
  /** caption 앞에 붙는 아이콘 슬롯 */
  captionIcon?: ReactNode;
  caption?: string;
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
  className,
  ...props
}: SequenceItemProps) {
  return (
    <div className={cn("flex w-full items-stretch gap-2", className)} {...props}>
      {/* 연결선이 다음 줄까지 이어져야 해서 줄 간격을 카드 margin으로 이 컴포넌트가 소유한다 */}
      <div className="flex w-[2.2rem] shrink-0 flex-col items-center">
        <span
          className={cn(
            "typo-caption-1-emphasized flex size-[2.2rem] shrink-0 items-center justify-center rounded-[0.8rem] text-white",
            active ? "bg-gray-10" : "bg-gray-70",
          )}
        >
          {step}
        </span>
        {!isLast && (
          <span aria-hidden="true" className="w-0 flex-1 border-l border-dashed border-gray-90" />
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 gap-4 rounded-[2.8rem] bg-bg-surface px-[1.3rem] py-4",
          !isLast && "mb-5",
        )}
      >
        <div className="h-[11.6rem] w-[12.8rem] shrink-0 overflow-hidden rounded-[2rem]">
          {imageSrc ? (
            <img src={imageSrc} alt={alt} className="size-full object-cover" />
          ) : (
            <span className="block size-full bg-media-placeholder" />
          )}
        </div>

        {/* 제목은 위, caption은 아래에 붙는다 — 그 사이를 남은 높이가 흡수한다 */}
        <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
          <div className="flex flex-col gap-3">
            <p className="typo-body-emphasized text-black">{title}</p>
            {descriptions && descriptions.length > 0 && (
              <div className="flex flex-col text-gray-10">
                {descriptions.map((description, index) => (
                  <p key={index} className="typo-subheadline-regular">
                    {description}
                  </p>
                ))}
              </div>
            )}
          </div>
          {(captionIcon || caption) && (
            <div className="flex items-center gap-2 text-gray-50">
              {captionIcon && <span className="flex shrink-0 items-center">{captionIcon}</span>}
              {caption && <span className="typo-subheadline-regular">{caption}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
