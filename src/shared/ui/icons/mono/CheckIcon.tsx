import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function CheckIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={34}
      height={34}
      fill="none"
      viewBox="0 0 34 34"
      className={cn(className)}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m13 17.3 2.8 2.7 5.2-5.8"
      />
    </svg>
  );
}
