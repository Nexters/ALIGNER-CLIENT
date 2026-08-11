import { cn } from "@/shared/lib/cn";
import {
  HomeFilledIcon,
  HomeOutlineIcon,
  UserFilledIcon,
  UserOutlineIcon,
} from "@/shared/ui/icons";
import TabItem from "./TabItem";
import { BOTTOM_TAB_BAR_BASE } from "./theme";

const TABS = [
  { id: "home", label: "홈", filledIcon: HomeFilledIcon, outlineIcon: HomeOutlineIcon },
  { id: "user", label: "유저", filledIcon: UserFilledIcon, outlineIcon: UserOutlineIcon },
] as const;

export type Tab = (typeof TABS)[number]["id"];

type BottomTabBarProps = {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  className?: string;
};

export default function BottomTabBar({ activeTab, onTabChange, className }: BottomTabBarProps) {
  return (
    <nav className={cn(BOTTOM_TAB_BAR_BASE, className)}>
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
