import { matchPath, Outlet, useLocation, useNavigate } from "react-router";
import { ROUTES } from "@/shared/config/routes";
import { BottomTabBar, type Tab } from "@/shared/ui/bottom-tab-bar";

const TAB_PATHS: Record<Tab, string> = {
  home: ROUTES.home,
  my: ROUTES.my,
};

function toAbsolutePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export function TabLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab =
    (Object.keys(TAB_PATHS) as Tab[]).find((tab) =>
      matchPath({ path: toAbsolutePath(TAB_PATHS[tab]), end: true }, location.pathname),
    ) ?? "home";

  return (
    <>
      <Outlet />
      <BottomTabBar
        activeTab={activeTab}
        onTabChange={(tab) => navigate(toAbsolutePath(TAB_PATHS[tab]))}
        className="fixed inset-x-0 bottom-[1.6rem] mx-auto w-fit"
      />
    </>
  );
}
