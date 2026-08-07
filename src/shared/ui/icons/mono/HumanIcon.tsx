import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function HumanIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
        d="M9.75 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m-6 3.75a.75.75 0 0 0 0 1.5H6.5a1 1 0 0 1 1 1v3.086a1 1 0 0 1-.293.707l-2.98 2.98a.753.753 0 1 0 1.064 1.065l3.952-3.958a1 1 0 0 1 1.222-.151l1.799 1.077a1 1 0 0 1 .486.858V15a.75.75 0 0 0 1.5 0v-2.572c0-.27-.135-.51-.375-.646l-2.141-1.29a1 1 0 0 1-.484-.857V7.75a1 1 0 0 1 1-1H15a.75.75 0 0 0 0-1.5z"
      />
    </svg>
  );
}
