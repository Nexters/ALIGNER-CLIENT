import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function ChevronUpIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={11}
      height={10.001}
      fill="none"
      viewBox="0 0 11 10.001"
      className={cn(className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M5.26.062a.5.5 0 0 1 .553.047l5 4a.5.5 0 0 1-.625.782L5.5 1.14.813 4.89a.5.5 0 0 1-.625-.782l5-4z"
      />
      <path
        fill="currentColor"
        d="M5.26 5.062a.5.5 0 0 1 .553.048l5 4a.5.5 0 0 1-.625.78L5.5 6.14.813 9.89a.5.5 0 0 1-.625-.78l5-4z"
      />
    </svg>
  );
}
