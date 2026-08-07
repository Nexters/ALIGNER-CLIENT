import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function CloseIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
      <path
        fill="currentColor"
        d="m18.5 19.097-5.59 5.59q-.313.312-.798.313-.485 0-.798-.314a1.08 1.08 0 0 1-.314-.798q0-.485.314-.799l5.589-5.589-5.59-5.59a1.08 1.08 0 0 1-.313-.798q0-.485.314-.798.314-.315.798-.314.485 0 .799.314l5.589 5.589 5.59-5.59q.314-.312.798-.313.485 0 .798.314.315.314.314.798 0 .485-.314.799L20.097 17.5l5.59 5.59q.312.314.313.798 0 .485-.314.798-.314.315-.798.314-.485 0-.799-.314z"
      />
    </svg>
  );
}
