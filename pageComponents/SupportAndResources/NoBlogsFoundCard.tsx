import React from "react";
import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

type Props = {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

function NoBlogsFoundCard({ setSearchQuery, setSelectedCategory }: Props) {
  return (
    <div className="text-center py-16 animate-fade-in">
      <Typography
        variant="h3"
        size="2xl"
        className="font-bold text-slate-900 mb-3"
      >
        No articles found
      </Typography>
      <Typography className="text-slate-600 mb-8">
        Try adjusting your search or filter criteria
      </Typography>

      {/* Updated reset button to use primary color */}
      <Button
        onClick={() => {
          setSearchQuery("");
          setSelectedCategory("All");
        }}
        className="bg-primary hover:bg-primary/90 text-white border-0"
      >
        Reset Filters
      </Button>
    </div>
  );
}

export default NoBlogsFoundCard;
