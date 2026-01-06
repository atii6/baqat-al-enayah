import type { RouteKeys, RoutesConfig } from "@/utilities/types/routeTypes";
import { ALL_USERS } from ".";
import { LayoutPanelLeft } from "lucide-react";

export const ROUTES: Record<RouteKeys, RoutesConfig> = {
  HOME: {
    allowedRoles: ALL_USERS,
    pathName: "/",
    showInSideBar: false,
    title: "Home",
    parentRoute: "",
    hasChildRoutes: false,
    isProtected: false,
    icon: undefined,
  },

  ABOUT: {
    allowedRoles: ALL_USERS,
    pathName: "/about",
    showInSideBar: false,
    title: "About",
    parentRoute: "",
    hasChildRoutes: false,
    isProtected: false,
    icon: undefined,
  },

  PUBLIC_REGISTRY: {
    allowedRoles: ALL_USERS,
    pathName: "/public-registry",
    showInSideBar: false,
    title: "Public Registry",
    parentRoute: "",
    hasChildRoutes: false,
    isProtected: false,
    icon: undefined,
  },

  DASHBOARD: {
    allowedRoles: ALL_USERS,
    pathName: "/dashboard",
    showInSideBar: true,
    title: "Dashboard",
    parentRoute: "",
    hasChildRoutes: false,
    isProtected: true,
    icon: LayoutPanelLeft,
  },
};
