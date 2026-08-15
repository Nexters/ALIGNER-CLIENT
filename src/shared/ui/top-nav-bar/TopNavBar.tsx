import type { ComponentType, ReactNode, SVGProps } from "react";
import { cn } from "@/shared/lib/cn";
import { IconButton } from "@/shared/ui/button";
import BackButton from "./BackButton";
import { CENTER_SLOT, RIGHT_ICON_SLOT, TOP_NAV_BAR_BASE } from "./theme";

type RightIconSlot =
  | { rightIcon?: undefined; rightIconLabel?: undefined; onRightIconClick?: undefined }
  | {
      rightIcon: ComponentType<SVGProps<SVGSVGElement>>;
      rightIconLabel: string;
      onRightIconClick?: () => void;
    };

type TopNavBarProps = {
  children?: ReactNode;
  onBack: () => void;
  className?: string;
} & RightIconSlot;

export default function TopNavBar({
  children,
  onBack,
  rightIcon: RightIcon,
  rightIconLabel,
  onRightIconClick,
  className,
}: TopNavBarProps) {
  return (
    <header className={cn(TOP_NAV_BAR_BASE, className)}>
      <BackButton onBack={onBack} />
      <div className={CENTER_SLOT}>{children}</div>
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
    </header>
  );
}
