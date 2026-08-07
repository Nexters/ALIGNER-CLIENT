import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function FireIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
      <g clipPath="url(#mono-FireIcon__a)">
        <path
          fill="currentColor"
          d="M14.245 9.233c-1.101-2.86-5.02-3.015-4.074-7.173a.354.354 0 0 0-.526-.386C7.1 3.175 5.27 6.183 6.805 10.124c.127.322-.252.624-.526.413-1.269-.96-1.402-2.342-1.29-3.33.042-.365-.434-.54-.638-.239-.477.73-.96 1.908-.96 3.682.266 3.926 3.583 5.132 4.775 5.286 1.703.218 3.547-.098 4.873-1.31 1.458-1.354 1.991-3.514 1.206-5.393M7.738 12.76c1.01-.245 1.528-.975 1.669-1.62.231-1.002-.673-1.984-.063-3.569.231 1.312 2.292 2.132 2.292 3.562.057 1.774-1.865 3.296-3.898 1.627"
        />
      </g>
      <defs>
        <clipPath id="mono-FireIcon__a">
          <path fill="currentColor" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
