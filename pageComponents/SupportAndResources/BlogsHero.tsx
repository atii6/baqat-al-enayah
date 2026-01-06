import React from "react";
import Typography from "@/components/ui/typography";

function BlogsHero() {
  return (
    <div className="relative overflow-hidden bg-linear-to-r from-primary via-secondary to-primary text-white min-h-screen flex items-center justify-center">
      <div className="relative px-6 py-20 text-center">
        <Typography
          variant="h1"
          className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in"
        >
          Care & Compassion Journals
        </Typography>
        <Typography
          variant="body1"
          className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-delay"
        >
          Stories, guidance, and insights to support patients, families, and
          those who care for them.
        </Typography>
      </div>
    </div>
  );
}

export default BlogsHero;
