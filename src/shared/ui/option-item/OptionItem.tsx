import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export interface OptionItemProps extends Omit<ComponentProps<"button">, "children"> {
  /** 없으면 플레이스홀더가 보인다 */
  imageSrc?: string;
  /** 이미지 대체 텍스트 겸 버튼 접근성 라벨 */
  alt: string;
  /** 선택 상태는 부모가 소유한다 */
  selected?: boolean;
}

export default function OptionItem({
  imageSrc,
  alt,
  selected = false,
  disabled,
  className,
  ...props
}: OptionItemProps) {
  return (
    <button
      type="button"
      aria-label={alt}
      aria-pressed={selected}
      disabled={disabled}
      className={cn(
        "group flex w-full flex-col items-center",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-full",
          selected && "ring-2 ring-accent-base",
        )}
      >
        {imageSrc ? (
          <img src={imageSrc} alt={alt} className="size-full object-cover" />
        ) : (
          <span className="block size-full bg-media-placeholder" />
        )}
        {/* selected는 테두리까지, hover/pressed는 이 오버레이만 — 세 상태가 같은 색을 공유한다 */}
        <span
          className={cn(
            "absolute inset-0 bg-accent-base/20 transition-opacity",
            selected ? "opacity-100" : "opacity-0",
            !disabled && "group-hover:opacity-100 group-active:opacity-100",
          )}
        />
      </span>
    </button>
  );
}
