import * as React from "react";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants/routes";
import { SideNavMain, type Items } from "./SideNavMain";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  //   const routePermissions = useUserStore(
  //     React.useCallback((state) => state.meta.permissions.routePermissions, [])
  //   );
  const { pathname } = useRouter();

  const navMain: Items[] = React.useMemo(() => {
    return Object.values(ROUTES).reduce<Items[]>((acc, value) => {
      const { hasChildRoutes } = value;
      if (hasChildRoutes) {
        const childrenRoutes: Items[] = Object.values(ROUTES)
          .filter((item) => item.parentRoute === value.pathName)
          .map((item) => ({
            title: item.title,
            icon: item.icon,
            url: item.pathName,
            shouldRender: true,
            isActive: pathname.includes(item.pathName),
          }));

        const route = {
          title: value.title,
          icon: value.icon,
          url: value.pathName,
          shouldRender: true,
          isActive: pathname.includes(value.pathName),
          items: childrenRoutes,
        };
        acc.push(route);
        return acc;
      }
      if (value.parentRoute || !value.showInSideBar) {
        return acc;
      }

      const route = {
        title: value.title,
        icon: value.icon,
        url: value.pathName,
        shouldRender: true,
        isActive: pathname.includes(value.pathName),
      };
      acc.push(route);

      return acc;
    }, []);
  }, [pathname]);

  return (
    <Sidebar collapsible="icon" className="h-[calc(100vh-14)]" {...props}>
      <SidebarContent className="p-2 bg-linear-to-b from-primary to-secondary">
        <SideNavMain items={navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
