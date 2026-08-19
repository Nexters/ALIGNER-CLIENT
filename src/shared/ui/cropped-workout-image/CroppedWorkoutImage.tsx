import { cn } from "@/shared/lib/cn";

export interface CroppedWorkoutImageProps {
  src: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
}

export default function CroppedWorkoutImage({
  src,
  alt = "",
  className,
  imageClassName,
}: CroppedWorkoutImageProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      <img src={src} alt={alt} className={cn("size-full object-contain", imageClassName)} />
    </div>
  );
}
