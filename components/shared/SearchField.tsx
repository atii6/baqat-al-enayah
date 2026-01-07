import { Search } from "lucide-react";
import React from "react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

type Props = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  inputStyle?: string;
  inputPlaceholder?: string;
};

function SearchField({
  searchQuery,
  setSearchQuery,
  inputStyle,
  inputPlaceholder,
}: Props) {
  return (
    <>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
      {/* Updated input focus border to use primary color */}
      <Input
        placeholder={inputPlaceholder}
        className={cn(
          "pl-12 rounded-md border-border bg-background",
          inputStyle
        )}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </>
  );
}

export default SearchField;
