import React from "react";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "../sidebar/app-sidebar";
import DashboardHeader from "@/pageComponents/Dashboard/DashboardHeader";
import { Avatar } from "../ui/avatar";
import { BookIcon, PersonStandingIcon } from "lucide-react";
import Typography from "../ui/typography";
import { usePathname } from "next/navigation";
import { REGISTRY_STEPS } from "@/constants/registrySteps";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/router";

export const routeToStepMap: Record<string, number> = {
  "/personal-details": 1,
  "/build-care-registry": 2,
  "/preview-and-publish": 3,
  "/share-and-receive": 4,
};

type PostAuthScreenLayoutProps = { children: React.ReactNode };

function PostAuthScreenLayout({ children }: PostAuthScreenLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isRegistrySteps =
    router.pathname === ROUTES.REGISTRY_SETUP_STEPS.pathName;

  const currentStepId = routeToStepMap[pathname] || 1;
  const currentStep =
    REGISTRY_STEPS.find((step) => step.id === currentStepId) ||
    REGISTRY_STEPS[0];

  const headerTitleComponent = (
    <div className="flex gap-3 items-center">
      <Avatar>
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
          {currentStepId === 1 ? <PersonStandingIcon /> : <BookIcon />}
        </div>
      </Avatar>

      <div>
        <Typography size="lg" className="font-bold text-[#0A0D14]">
          {`${currentStep.id}. ${currentStep.title}`}
        </Typography>
        <Typography variant="caption" size="sm" className="text-[#525866]">
          {currentStep.description}
        </Typography>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="min-h-screen w-full organic-bg">
          <DashboardHeader
            HeaderTitleComponent={
              isRegistrySteps ? headerTitleComponent : undefined
            }
          />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

export default PostAuthScreenLayout;
