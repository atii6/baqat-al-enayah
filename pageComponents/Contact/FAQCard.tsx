import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import React from "react";

function FAQCard() {
  return (
    <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50">
      <Typography className="font-heading text-lg font-semibold text-foreground mb-2">
        Have Questions?
      </Typography>
      <Typography className="text-muted-foreground text-sm mb-4">
        Check out our frequently asked questions for quick answers.
      </Typography>
      <Button
        variant="outline"
        className="w-full rounded-md border-primary/30 hover:bg-primary/10 hover:border-primary/50"
      >
        View FAQ
      </Button>
    </div>
  );
}

export default FAQCard;
