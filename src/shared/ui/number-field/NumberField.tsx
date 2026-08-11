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
        "group flex h-[8.2rem] w-full items-center justify-center rounded-[2rem] border bg-bg-surface px-8",
        error ? "border-error" : "border-border-base focus-within:border-accent-base",
        className,
      )}
    >
      {/* 덩어리는 박스 세로 중앙에, 값과 suffix끼리는 밑선을 맞춘다 */}
      <div className="flex items-end">
        {/* value + suffix를 하나의 덩어리로 center 정렬하기 위해
            ghost span으로 input 너비를 value에 맞게 자동 조정한다 */}
        <span className="relative inline-flex">
          <span aria-hidden className="invisible whitespace-pre typo-title-1-emphasized">
            {String(props.value || props.placeholder || "0")}
          </span>
          <input
            type="text"
            inputMode="numeric"
            onChange={handleChange}
            className="absolute inset-0 w-full bg-transparent text-center outline-none typo-title-1-emphasized text-ink-strong placeholder:text-gray-95"
            {...props}
          />
        </span>
        {suffix && (
          // 값이 비어 있을 때는 suffix도 placeholder와 같은 톤으로 내린다
          <span className="ml-3 typo-headline-regular text-ink-strong group-has-[input:placeholder-shown]:text-gray-95">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
