import { matchPath, Outlet, useLocation, useNavigate } from "react-router";
import { ROUTES } from "@/shared/config/routes";
import { BottomTabBar, type BottomTabBarTab } from "@/shared/ui/bottom-tab-bar";
import {
  HomeFilledIcon,
  HomeOutlineIcon,
  UserFilledIcon,
  UserOutlineIcon,
} from "@/shared/ui/icons";

type Tab = "home" | "my";

const TABS: (BottomTabBarTab<Tab> & { path: string })[] = [
  {
    id: "home",
    path: ROUTES.home,
    label: "홈",
    filledIcon: HomeFilledIcon,
    outlineIcon: HomeOutlineIcon,
  },
  {
    id: "my",
    path: ROUTES.my,
    label: "유저",
    filledIcon: UserFilledIcon,
    outlineIcon: UserOutlineIcon,
  },
];

function toAbsolutePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function TabLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab =
    TABS.find((tab) => matchPath({ path: toAbsolutePath(tab.path), end: true }, location.pathname))
      ?.id ?? "home";

  return (
    <>
      <Outlet />
      <BottomTabBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={(tab) => navigate(toAbsolutePath(TABS.find((t) => t.id === tab)!.path))}
        className="fixed inset-x-0 bottom-[1.6rem] mx-auto w-fit"
      />
    </>
  );
}
