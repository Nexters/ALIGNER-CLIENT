import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function PreviousIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={36}
      height={36}
      fill="none"
      viewBox="0 0 36 36"
      className={cn(className)}
      {...props}
    >
      <g clipPath="url(#mono-PreviousIcon__a)">
        <path fill="currentColor" d="M9 9h3v18H9zm5.25 9L27 27V9z" />
      </g>
      <defs>
        <clipPath id="mono-PreviousIcon__a">
          <path fill="currentColor" d="M0 0h36v36H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
