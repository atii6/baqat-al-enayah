import React from "react";
import { SidebarProvider } from "../ui/sidebar";

type PostAuthScreenLayoutProps = { children: React.ReactNode };

function PostAuthScreenLayout({ children }: PostAuthScreenLayoutProps) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background-dark w-full">
      <SidebarProvider>
        {/* <AppSidebar /> */}
        <main className=" min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-7rem)] w-full overflow-hidden bg-[#F3F3F3]">
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}

export default PostAuthScreenLayout;
