import { ForwardRefExoticComponent, RefAttributes } from "react";
import type { LucideProps } from "lucide-react";
import { USER_ROLES } from "@/constants";

export type RouteKeys =
  | "HOME"
  | "ABOUT"
  | "PUBLIC_REGISTRY"
  | "DASHBOARD"
  | "BLOGS"
  | "REGISTRY_SETUP_STEPS";

export type RoutesConfig = {
  allowedRoles: (typeof USER_ROLES)[keyof typeof USER_ROLES][];
  pathName: string;
  showInSideBar: boolean;
  title: string;
  parentRoute: string;
  hasChildRoutes: boolean;
  isProtected: boolean;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
