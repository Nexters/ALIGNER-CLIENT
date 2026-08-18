import { cn } from "@/shared/lib/cn";

export interface CroppedWorkoutImageProps {
  src: string;
  alt?: string;
  className?: string;
}

// TODO: yoga-1.png 원본이 인물 주위에 여백이 커서 트리밍 박스(416,223,650x828 / 1369x1149) 기준으로
// 확대·이동해 Figma 크롭 비율(182.7x224.1)에 맞췄다. 실제 API 이미지로 교체 시 제거
export default function CroppedWorkoutImage({
  src,
  alt = "",
  className,
}: CroppedWorkoutImageProps) {
  return (
    <div
      className={cn(
        "absolute left-1/2 top-1/2 h-[22.41rem] w-[18.27rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className="absolute left-[-11.259rem] top-[-6.035rem] h-[31.094rem] w-[37.052rem] max-w-none"
      />
    </div>
  );
}
