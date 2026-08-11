import { useState, type ChangeEvent, type ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

/**
 * 값은 항상 컴포넌트가 제어하고, 숫자만 남긴 문자열을 `onValueChange`로 넘긴다.
 * 네이티브 `onChange`를 열면 필터링 보장이 호출부로 새기 때문에 계약에서 뺐다.
 */
export interface NumberFieldProps extends Omit<
  ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange" | "children"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  suffix?: string;
  error?: boolean;
}

export default function NumberField({
  suffix,
  error = false,
  className,
  value,
  defaultValue,
  placeholder,
  onValueChange,
  ...props
}: NumberFieldProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  // ghost 폭 기준이자 input의 실제 값
  const currentValue = isControlled ? value : uncontrolledValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    if (!isControlled) setUncontrolledValue(digitsOnly);
    onValueChange?.(digitsOnly);
  };

  return (
    <div
      className={cn(
        "flex h-[8.2rem] w-full items-center justify-center rounded-[2rem] border bg-bg-surface px-8",
        error ? "border-error" : "border-border-base focus-within:border-accent-base",
        className,
      )}
    >
      {/* 덩어리는 박스 세로 중앙에, 값과 suffix끼리는 밑선을 맞춘다.
          min-w-0이 없으면 긴 값이 박스 밖으로 삐져나간다 */}
      <div className="flex min-w-0 items-end">
        {/* value + suffix를 하나의 덩어리로 center 정렬하기 위해
            ghost span으로 input 너비를 값에 맞게 자동 조정한다.
            박스 폭을 넘어서면 여기서 잘리고 값은 input 안에서 스크롤된다 */}
        <span className="relative inline-flex min-w-0 overflow-hidden">
          <span aria-hidden className="invisible whitespace-pre typo-title-1-emphasized">
            {currentValue || placeholder || "0"}
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={currentValue}
            placeholder={placeholder}
            onChange={handleChange}
            className="absolute inset-0 w-full bg-transparent text-center outline-none typo-title-1-emphasized text-ink-strong placeholder:text-gray-95"
            {...props}
          />
        </span>
        {suffix && (
          // 값이 비어 있을 때는 suffix도 placeholder와 같은 톤으로 내린다
          <span
            className={cn(
              "ml-3 shrink-0 typo-headline-regular",
              currentValue ? "text-ink-strong" : "text-gray-95",
            )}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
