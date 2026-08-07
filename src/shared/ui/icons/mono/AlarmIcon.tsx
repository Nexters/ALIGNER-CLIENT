import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function AlarmIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      fill="none"
      viewBox="0 0 18 18"
      className={cn(className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 2h4v1.333H7zm6.687 4.26.947-.947c-.287-.34-.6-.66-.94-.94l-.947.947A5.97 5.97 0 0 0 9 4a6 6 0 1 0 5.962 5.328 6 6 0 0 0-1.275-3.068m-4.02 4.407H8.334v-4h1.333z"
      />
    </svg>
  );
}
