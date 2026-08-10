import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export interface OptionItemProps extends Omit<ComponentProps<"button">, "children"> {
  /** 없으면 플레이스홀더가 보인다 */
  imageSrc?: string;
  label: string;
  /** 선택 상태는 부모가 소유한다 */
  selected?: boolean;
}

export default function OptionItem({
  imageSrc,
  label,
  selected = false,
  disabled,
  className,
  ...props
}: OptionItemProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      className={cn(
        "group flex w-full flex-col items-center gap-[1.1rem]",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "relative aspect-square w-full overflow-hidden rounded-full",
          selected && "border-2 border-primary-500",
        )}
      >
        {imageSrc ? (
          <img src={imageSrc} alt="" className="size-full object-cover" />
        ) : (
          <span className="block size-full bg-media-placeholder" />
        )}
        {/* selected는 테두리까지, hover/pressed는 이 오버레이만 — 세 상태가 같은 색을 공유한다 */}
        <span
          className={cn(
            "absolute inset-0 bg-primary-500/20 transition-opacity",
            selected ? "opacity-100" : "opacity-0",
            !disabled && "group-hover:opacity-100 group-active:opacity-100",
          )}
        />
      </span>
      <span className="typo-subheadline-emphasized w-full break-words text-center text-gray-10">
        {label}
      </span>
    </button>
  );
}
