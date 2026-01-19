import React from "react";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { useSession } from "next-auth/react";
import { Spinner } from "../ui/spinner";
import { CreateCareRegistryModalProvider } from "@/context/CreateRegistryModalContext";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "next/router";
import { useUserStore } from "@/store";
import LoaderLogo from "../shared/loader-logo";

function AppLayout({ Component, pageProps }: AppProps) {
  const { data: session, status } = useSession();
  const setUser = useUserStore(React.useCallback((state) => state.setUser, []));
  const resetUser = useUserStore(
    React.useCallback((state) => state.resetUser, [])
  );
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

    // AUTHENTICATED
    if (isAuthenticated && session?.user) {
      setUser(session.user);

      // Redirect away from public pages
      if (!isProtectedRoute) {
        router.replace(ROUTES.DASHBOARD.pathName);
      }

      return;
    }

    // UNAUTHENTICATED
    resetUser();

    // Block protected routes
    if (isProtectedRoute) {
      router.replace(ROUTES.HOME.pathName);
    }
  }, [
    status,
    isAuthenticated,
    session?.user,
    isProtectedRoute,
    router,
    setUser,
    resetUser,
  ]);

  if (!status || status === "loading") {
    return <LoaderLogo />;
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
