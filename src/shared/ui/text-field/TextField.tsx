import { useState, type ChangeEvent, type ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export interface TextFieldProps extends Omit<
  ComponentProps<"input">,
  "type" | "value" | "defaultValue" | "onChange" | "children"
> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  error?: boolean;
}

export default function TextField({
  error = false,
  className,
  value,
  defaultValue,
  onValueChange,
  ...props
}: TextFieldProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? "");
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : uncontrolledValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledValue(e.target.value);
    onValueChange?.(e.target.value);
  };

  return (
    <input
      type="text"
      value={currentValue}
      onChange={handleChange}
      className={cn(
        "h-[8.2rem] w-full rounded-[2rem] border bg-bg-surface px-8 typo-body-emphasized text-ink-strong outline-none placeholder:text-gray-95",
        error ? "border-error" : "border-border-base focus:border-accent-base",
        className,
      )}
      {...props}
    />
  );
}
