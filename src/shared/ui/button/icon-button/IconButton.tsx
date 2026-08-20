import type { ButtonHTMLAttributes, ComponentType, SVGProps } from "react";
import { cn } from "@/shared/lib/cn";

const ICON_BUTTON_BASE = "flex items-center justify-center";

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "aria-label"> & {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  "aria-label": string;
  iconClassName?: string;
};

export default function IconButton({
  icon: Icon,
  iconClassName,
  type = "button",
  className,
  ...props
}: IconButtonProps) {
  return (
    <button type={type} className={cn(ICON_BUTTON_BASE, className)} {...props}>
      <Icon aria-hidden="true" className={cn(iconClassName)} />
    </button>
  );
}
