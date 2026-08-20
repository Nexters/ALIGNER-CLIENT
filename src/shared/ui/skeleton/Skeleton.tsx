import type { ComponentProps } from "react";
import { cn } from "@/shared/lib/cn";

export type SkeletonProps = ComponentProps<"div">;

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-shimmer bg-[length:200%_100%] bg-[linear-gradient(90deg,var(--color-gray-96)_25%,var(--color-gray-90)_50%,var(--color-gray-96)_75%)]",
        className,
      )}
      {...props}
    />
  );
}
