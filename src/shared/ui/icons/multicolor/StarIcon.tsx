import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function StarIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
        fill="url(#multicolor-StarIcon__a)"
        d="M9.107 5.448c.598-1.75 3.016-1.803 3.725-.159l.06.16.807 2.36a4 4 0 0 0 2.276 2.411l.217.081 2.36.806c1.75.598 1.803 3.016.16 3.725l-.16.06-2.36.807a4 4 0 0 0-2.412 2.276l-.08.216-.807 2.361c-.598 1.75-3.016 1.803-3.724.16l-.062-.16-.806-2.36a4 4 0 0 0-2.276-2.412l-.216-.081-2.36-.806c-1.75-.598-1.804-3.016-.16-3.724l.16-.062 2.36-.806A4 4 0 0 0 8.22 8.025l.081-.216zM19 2a1 1 0 0 1 .898.56l.048.117.35 1.026 1.027.35a1 1 0 0 1 .118 1.845l-.118.048-1.026.35-.35 1.027a1 1 0 0 1-1.845.117l-.048-.117-.35-1.026-1.027-.35a1 1 0 0 1-.118-1.845l.118-.048 1.026-.35.35-1.027A1 1 0 0 1 19 2"
      />
      <defs>
        <linearGradient
          id="multicolor-StarIcon__a"
          x1={18.001}
          x2={9.829}
          y1={0}
          y2={30.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00BDFF" />
          <stop offset={1} stopColor="#ECFF3F" />
        </linearGradient>
      </defs>
    </svg>
  );
}
