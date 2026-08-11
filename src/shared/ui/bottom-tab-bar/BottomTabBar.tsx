import type { ComponentType, SVGProps } from "react";
import { cn } from "@/shared/lib/cn";
import { ROUTES } from "@/shared/config/routes";
import {
  HomeFilledIcon,
  HomeOutlineIcon,
  UserFilledIcon,
  UserOutlineIcon,
} from "@/shared/ui/icons";
import TabItem from "./TabItem";

type TabRoute = keyof Pick<typeof ROUTES, "home" | "my">;

const TABS = [
  { id: "home", label: "홈", filledIcon: HomeFilledIcon, outlineIcon: HomeOutlineIcon },
  { id: "my", label: "유저", filledIcon: UserFilledIcon, outlineIcon: UserOutlineIcon },
] as const satisfies {
  id: TabRoute;
  label: string;
  filledIcon: ComponentType<SVGProps<SVGSVGElement>>;
  outlineIcon: ComponentType<SVGProps<SVGSVGElement>>;
}[];

export type Tab = (typeof TABS)[number]["id"];

type BottomTabBarProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  className?: string;
};

export default function BottomTabBar({ activeTab, onTabChange, className }: BottomTabBarProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-[0.4rem] rounded-[2rem] bg-white/50 p-[0.4rem] shadow-tab-bar backdrop-blur-[0.5rem]",
        className,
      )}
    >
      {TABS.map(({ id, label, filledIcon, outlineIcon }) => (
        <TabItem
          key={id}
          icon={activeTab === id ? filledIcon : outlineIcon}
          label={label}
          isActive={activeTab === id}
          onClick={() => onTabChange(id)}
        />
      ))}
    </nav>
  );
}
