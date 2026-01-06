import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";
import React from "react";

type Props = {
  viewMode: string;
  setViewMode: React.Dispatch<React.SetStateAction<"grid" | "list">>;
};

function ViewModeToggle({ viewMode, setViewMode }: Props) {
  return (
    <div className="hidden md:flex items-center gap-2 border border-border rounded-md p-1">
      <Button
        variant={viewMode === "grid" ? "default" : "ghost"}
        size="icon"
        className="h-10 w-10 rounded-lg"
        onClick={() => setViewMode("grid")}
      >
        <Grid3X3 className="w-5 h-5" />
      </Button>
      <Button
        variant={viewMode === "list" ? "default" : "ghost"}
        size="icon"
        className="h-10 w-10 rounded-lg"
        onClick={() => setViewMode("list")}
      >
        <List className="w-5 h-5" />
      </Button>
    </div>
  );
}

export default ViewModeToggle;
