import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import React from "react";

function ContributionCTA() {
  return (
    <div className="bg-linear-to-r from-primary to-secondary text-white rounded-md p-8 md:p-12 mb-12 animate-fade-in-delay-3">
      <Typography size="2xl" className="font-bold mb-3">
        Help This Family
      </Typography>
      <Typography size="2xl" className="text-white/90 mb-6">
        Your contribution makes a direct impact on this family&apos;s wellbeing
        and recovery.
      </Typography>

      <Button
        variant="outline"
        className="cursor-pointer bg-primary text-white hover:text-primary font-semibold px-8 shadow-md border"
      >
        Contribute Now
      </Button>
    </div>
  );
}

export default ContributionCTA;
