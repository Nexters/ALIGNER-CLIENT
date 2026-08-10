import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function UserFilledIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
      <g fill="currentColor" stroke="currentColor">
        <path d="M12 2.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9ZM12 15c4.828 0 8.59 3.222 8.59 7H3.41c0-3.778 3.762-7 8.59-7Z" />
      </g>
    </svg>
  );
}
