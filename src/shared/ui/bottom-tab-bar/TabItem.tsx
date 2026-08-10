import type { ComponentType, SVGProps } from "react";
import { cn } from "@/shared/lib/cn";
import { IconButton } from "@/shared/ui/button";
import {
  TAB_ITEM_ACTIVE_BG,
  TAB_ITEM_ACTIVE_ICON,
  TAB_ITEM_BASE,
  TAB_ITEM_INACTIVE_ICON,
} from "./theme";

type TabItemProps = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  isActive: boolean;
  onClick: () => void;
};

export default function TabItem({ icon, label, isActive, onClick }: TabItemProps) {
  return (
    <IconButton
      icon={icon}
      aria-label={label}
      onClick={onClick}
      className={cn(TAB_ITEM_BASE, isActive && TAB_ITEM_ACTIVE_BG)}
      iconClassName={isActive ? TAB_ITEM_ACTIVE_ICON : TAB_ITEM_INACTIVE_ICON}
    />
  );
}
