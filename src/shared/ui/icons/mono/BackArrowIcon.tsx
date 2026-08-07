import type { SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

export default function BackArrowIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
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
        d="M11.293 18.007q0-.25.083-.448.09-.2.282-.382l8.409-8.127q.307-.307.755-.307.3 0 .54.15.249.14.39.381.15.24.15.54 0 .44-.324.772l-7.703 7.42 7.703 7.413q.324.334.323.772 0 .308-.149.548a1 1 0 0 1-.39.39q-.24.142-.54.141-.448 0-.755-.307l-8.409-8.126a1.3 1.3 0 0 1-.282-.382 1.2 1.2 0 0 1-.083-.448"
        style={{
          mixBlendMode: "plus-darker",
        }}
      />
    </svg>
  );
}
