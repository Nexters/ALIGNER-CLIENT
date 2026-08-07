import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function NextIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
      <g clipPath="url(#mono-NextIcon__a)">
        <path fill="currentColor" d="m9 27 12.75-9L9 9zM24 9v18h3V9z" />
      </g>
      <defs>
        <clipPath id="mono-NextIcon__a">
          <path fill="currentColor" d="M0 0h36v36H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
