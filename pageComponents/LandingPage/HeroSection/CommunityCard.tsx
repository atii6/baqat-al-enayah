import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Typography from "@/components/ui/typography";

function CommunityCard() {
  return (
    <div className="animate-fade-in-left">
      <Card className="relative bg-card/60 backdrop-blur-lg p-6 rounded-3xl shadow-sm overflow-hidden md:min-h-80 border-0">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
          <div className="w-full h-full bg-linear-to-l from-accent to-transparent rounded-r-3xl" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="space-y-2">
            <div>
              <Typography
                variant="h1"
                className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
              >
                A Community of Care,
              </Typography>
              <Typography
                variant="h1"
                className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight"
              >
                Connected By Heart.
              </Typography>
            </div>

            <Typography variant="caption" className="text-muted-foreground">
              Receive and give support, limitless, and build strength together.
            </Typography>
          </div>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary text-primary-foreground rounded-full px-8 py-6 text-base font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Create a Care Registry
          </Button>
        </div>

        <Card className="absolute hidden md:block gap-2 bottom-2 md:bottom-7 right-4 bg-card p-4 rounded-2xl shadow-md border-0 w-48 animate-scale-in delay-300">
          <Typography
            variant="caption"
            size="xs"
            className="text-muted-foreground"
          >
            Circle Name
          </Typography>
          <Typography variant="label" size="sm">
            Warm Kindness Matters!
          </Typography>
          <Typography
            variant="caption"
            size="xs"
            className="text-muted-foreground"
          >
            Shared Good Photos
          </Typography>
        </Card>
      </Card>
    </div>
  );
}

export default CommunityCard;
