import { usePathname } from "next/navigation";
import Footer from "../Footer";
import Navigation from "../navbar";
import { useCreateCareRegistryModal } from "@/context/CreateRegistryModalContext";
import CreateRegistryFormModal from "@/pages/care-stories/CreateRegistryFormModal";

type PreAuthScreenLayoutProps = {
  children: React.ReactNode;
};

function PreAuthScreenLayout({ children }: PreAuthScreenLayoutProps) {
  const pathName = usePathname();
  const isNotLandingPage = pathName !== "/";
  const { isOpen, closeModal } = useCreateCareRegistryModal();
  return (
    <div className="min-h-screen">
      {isNotLandingPage && (
        <div className="flex items-center justify-center">
          <Navigation />
        </div>
      )}

      <div className="min-h-screen bg-background organic-bg">{children}</div>
      <Footer />
      <CreateRegistryFormModal open={isOpen} onClose={closeModal} />
    </div>
  );
}

export default PreAuthScreenLayout;
