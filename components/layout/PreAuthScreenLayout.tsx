import { usePathname } from "next/navigation";
import Footer from "../Footer";
import Navigation from "../navbar";

type PreAuthScreenLayoutProps = {
  children: React.ReactNode;
};

function PreAuthScreenLayout({ children }: PreAuthScreenLayoutProps) {
  const pathName = usePathname();
  const isNotLandingPage = pathName !== "/";
  return (
    <div className="min-h-screen">
      {isNotLandingPage && (
        <div className="flex items-center justify-center">
          <Navigation />
        </div>
      )}

      <div className="min-h-screen bg-background organic-bg">{children}</div>
      <Footer />
    </div>
  );
}

export default PreAuthScreenLayout;
