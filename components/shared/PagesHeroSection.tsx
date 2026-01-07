import React from "react";
import Typography from "@/components/ui/typography";
type PagesHeroSectionProps = {
  title: string;
  description: string;
};

function PagesHeroSection({ title, description }: PagesHeroSectionProps) {
  return (
    <div className="relative overflow-hidden bg-linear-to-r from-primary via-secondary to-primary text-white min-h-screen flex items-center justify-center">
      <div className="relative px-6 py-20 text-center">
        <Typography
          variant="h1"
          className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in"
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-delay"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
}

export default PagesHeroSection;
