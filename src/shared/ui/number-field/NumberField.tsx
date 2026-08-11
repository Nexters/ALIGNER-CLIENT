import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export interface NumberFieldProps extends Omit<ComponentProps<"input">, "type"> {
  suffix?: string;
  error?: boolean;
}

export default function NumberField({
  suffix,
  error = false,
  className,
  onChange,
  ...props
}: NumberFieldProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/\D/g, "");
    onChange?.(e);
  };

  return (
    <div
      className={cn(
        "flex h-[6rem] w-full items-center justify-center rounded-[1.6rem] border bg-bg-surface px-8",
        error ? "border-error" : "border-border-base focus-within:border-accent-base",
        className,
      )}
    >
      {/* value + suffix를 하나의 덩어리로 center 정렬하기 위해
          ghost span으로 input 너비를 value에 맞게 자동 조정한다 */}
      <span className="relative inline-flex items-center">
        <span aria-hidden className="invisible whitespace-pre typo-title-2-emphasized">
          {String(props.value || props.placeholder || "0")}
        </span>
        <input
          type="text"
          inputMode="numeric"
          onChange={handleChange}
          className="absolute inset-0 w-full bg-transparent text-center outline-none typo-title-2-emphasized text-ink-strong placeholder:text-ink-muted"
          {...props}
        />
      </span>
      {suffix && <span className="ml-4 typo-title-2-regular text-ink-strong">{suffix}</span>}
    </div>
  );
}
