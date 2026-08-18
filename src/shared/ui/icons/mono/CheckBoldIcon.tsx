import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function CheckBoldIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={26}
      fill="none"
      viewBox="0 0 26 26"
      className={cn(className)}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="m5 13.5 5.5 5.5L21 7.5"
      />
    </svg>
  );
}
