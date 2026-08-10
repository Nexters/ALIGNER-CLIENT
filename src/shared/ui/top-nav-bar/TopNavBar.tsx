import type { ComponentType, ReactNode, SVGProps } from "react";
import { cn } from "@/shared/lib/cn";
import { IconButton } from "@/shared/ui/button";
import BackButton from "./BackButton";
import { CENTER_SLOT, RIGHT_ICON_SLOT, TITLE, TOP_NAV_BAR_BASE } from "./theme";

type TopNavBarProps = {
  title?: string;
  children?: ReactNode;
  onBack: () => void;
  className?: string;
} & (
  | { rightIcon?: undefined; rightIconLabel?: undefined; onRightIconClick?: undefined }
  | {
      rightIcon: ComponentType<SVGProps<SVGSVGElement>>;
      rightIconLabel: string;
      onRightIconClick?: () => void;
    }
);

export default function TopNavBar({
  title,
  children,
  onBack,
  rightIcon: RightIcon,
  rightIconLabel,
  onRightIconClick,
  className,
}: TopNavBarProps) {
  return (
    <div className={cn(TOP_NAV_BAR_BASE, className)}>
      <BackButton onBack={onBack} />
      <div className={CENTER_SLOT}>{children ?? <span className={TITLE}>{title}</span>}</div>
      <div className={RIGHT_ICON_SLOT}>
        {RightIcon && (
          <IconButton
            icon={RightIcon}
            aria-label={rightIconLabel}
            onClick={onRightIconClick}
            className="size-full"
          />
        )}
      </div>
    </div>
  );
}
