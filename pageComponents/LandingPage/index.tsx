import HowItWorks from "./HowItWorks";
import SupportDashboard from "./SupportDashboard";
import HeroSection from "./HeroSection";
import FamilyCardCarousel from "./FamilyCardCarousel";

function LandingPage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <FamilyCardCarousel />
      <SupportDashboard />
    </>
  );
}

export default LandingPage;
