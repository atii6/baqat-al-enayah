import React from "react";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { useSession } from "next-auth/react";
import { Spinner } from "../ui/spinner";
import { CreateCareRegistryModalProvider } from "@/context/CreateRegistryModalContext";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/router";

function AppLayout({ Component, pageProps }: AppProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const currentRoute = React.useMemo(() => {
    return Object.values(ROUTES).find(
      (route) => route.pathName === router.pathname
    );
  }, [router.pathname]);

  const isProtectedRoute = currentRoute?.isProtected ?? false;
  const isAuthenticated = !!session;

  React.useEffect(() => {
    if (status === "loading") return;

    // User is NOT authenticated but route is protected
    if (!isAuthenticated && isProtectedRoute) {
      router.replace(ROUTES.HOME.pathName);
      return;
    }

    // User IS authenticated but route is public
    if (isAuthenticated && !isProtectedRoute) {
      router.replace(ROUTES.DASHBOARD.pathName);
    }
  }, [status, isAuthenticated, isProtectedRoute, router]);

  if (!status || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3">
        <Spinner />
        Loading...
      </div>
    );
  }

  if (!isAuthenticated && !isProtectedRoute) {
    const PreAuthScreenLayout = dynamic(() => import("./PreAuthScreenLayout"), {
      ssr: false,
    });

    return (
      <CreateCareRegistryModalProvider>
        <PreAuthScreenLayout>
          <Component {...pageProps} />
        </PreAuthScreenLayout>
      </CreateCareRegistryModalProvider>
    );
  }

  const PostAuthScreenLayout = dynamic(() => import("./PostAuthScreenLayout"), {
    ssr: false,
  });

  return (
    <PostAuthScreenLayout>
      <Component {...pageProps} />
    </PostAuthScreenLayout>
  );
}

export default AppLayout;
