import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function UserOutlineIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      overflow="visible"
      preserveAspectRatio="none"
      style={{
        display: "block",
      }}
      viewBox="0 0 24 24"
      className={cn(className)}
      {...props}
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
        <path d="M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19 21c0-3.317-3.137-6-7-6s-7 2.683-7 6" />
      </g>
    </svg>
  );
}
