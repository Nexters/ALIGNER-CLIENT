import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function RightArrowIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      fill="none"
      viewBox="0 0 32 32"
      className={cn(className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M17.96 11.373a1 1 0 1 1 1.413-1.413l5.334 5.333a1 1 0 0 1 0 1.414l-5.334 5.333a.997.997 0 0 1-1.439.025 1 1 0 0 1 .026-1.438L21.587 17H8.667a1 1 0 0 1 0-2h12.92z"
      />
    </svg>
  );
}
