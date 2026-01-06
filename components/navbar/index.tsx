import React from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathName = usePathname();
  const router = useRouter();
  const isLandingPage = pathName === "/";
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navTabs = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Support & Resources", path: "/support-resources" },
    { name: "Care Stories", path: "/care-stories" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div
      className={cn(
        "fixed z-50 flex items-center rounded-full px-2 py-2 gap-1 backdrop-blur-lg",
        "transition-all duration-500 ease-in-out animate-fade-in-up",
        scrolled ? "top-0 bg-card shadow-md" : "top-2 bg-card/30 shadow-sm",
        !isLandingPage && "border"
      )}
    >
      {navTabs.map((tab) => {
        const isActive =
          tab.path === "/" ? pathName === "/" : pathName.startsWith(tab.path);

        return (
          <Button
            key={tab.path}
            variant="link"
            onClick={() => router.push(tab.path)}
            className={cn(
              "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
              isActive
                ? "bg-primary text-primary-foreground"
                : scrolled || !isLandingPage
                ? "text-foreground hover:bg-accent"
                : "text-muted hover:bg-primary/40"
            )}
          >
            {tab.name}
          </Button>
        );
      })}

      {/* Decorative indicator */}
      <div
        className={cn(
          "ml-2 w-10 h-10 rounded-full flex items-center justify-center",
          "transition-all duration-500 ease-in-out",
          scrolled || !isLandingPage ? "bg-primary/20" : "bg-white/20"
        )}
      >
        <div
          className={cn(
            "w-6 h-6 rounded-full transition-all duration-500",
            scrolled || !isLandingPage ? "bg-primary" : "bg-white"
          )}
        />
      </div>
    </div>
  );
};

export default Navigation;
