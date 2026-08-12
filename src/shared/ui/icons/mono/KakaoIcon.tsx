import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function KakaoIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      className={cn(className)}
      {...props}
    >
      <path
        fill="currentColor"
        d="M12.248 4.5c-4.693 0-8.498 2.986-8.498 6.662 0 2.25 1.42 4.24 3.592 5.45l-.667 3.507a.32.32 0 0 0 .139.328.33.33 0 0 0 .358-.001l3.994-2.665q.54.055 1.082.055c4.692 0 8.497-2.986 8.497-6.662S16.94 4.5 12.248 4.5"
      />
    </svg>
  );
}
