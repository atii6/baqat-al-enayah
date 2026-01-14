import React from "react";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import { useSession } from "next-auth/react";
import { Spinner } from "../ui/spinner";
import { CreateCareRegistryModalProvider } from "@/context/CreateRegistryModalContext";

function AppLayout({ Component, pageProps }: AppProps) {
  const { data: session, status } = useSession();

  if (!status || status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center gap-3">
        <Spinner />
        Loading...
      </div>
    );
  }

  const isAuthenticated = !!session;

  if (!isAuthenticated) {
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
