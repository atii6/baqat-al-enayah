import React from "react";
import Head from "next/head";
import { Merriweather } from "next/font/google";
import AppLayout from "@/components/layout/AppLayout";
import type { AppProps } from "next/app";
import "../styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";
import { CACHE_AND_STALE_TIME } from "@/utilities/constants/queryConstant";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function MyApp(props: AppProps) {
  const activeThemeClass = "theme-v1";

  React.useEffect(() => {
    document.documentElement.className = activeThemeClass;
  }, [activeThemeClass]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        ...CACHE_AND_STALE_TIME,
      },
    },
  });

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta name="theme-color" content="#0070f3" />
        <meta
          name="description"
          content="Employee and visitor check-in system for canteen"
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <title>Baqat Al-Enayah</title>
        <meta property="og:title" content="Baqat Al-Enayah" />
        <meta property="og:site_name" content="Baqat Al-Enayah" />
        <meta
          property="og:description"
          content="Employee and visitor check-in system for canteen"
        />
      </Head>
      <SessionProvider refetchOnWindowFocus={false}>
        <QueryClientProvider client={queryClient}>
          <div className={merriweather.className}>
            <AppLayout {...props} />
            <Toaster expand={false} richColors closeButton />
          </div>
        </QueryClientProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
