import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export interface ErrorMessageProps extends ComponentProps<"span"> {
  message: string;
}

export default function ErrorMessage({ message, className, ...props }: ErrorMessageProps) {
  return (
    <span className={cn("typo-caption-1-emphasized text-ink-error", className)} {...props}>
      {message}
    </span>
  );
}
