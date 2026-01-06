import React from "react";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "All",
  "Financial Aid",
  "Childcare",
  "Products",
  "Donations",
  "Wellness",
  "Support",
];

type Props = {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

function CategoryFilters({ selectedCategory, setSelectedCategory }: Props) {
  return (
    <div className="mb-16 animate-fade-in-delay-3">
      <p className="text-sm font-semibold text-slate-600 mb-4">
        Filter by category
      </p>
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant="outline"
            className={`cursor-pointer hover:text-white px-5 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category
                ? "bg-linear-to-r from-primary to-secondary text-white shadow-lg scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:border-primary/50 hover:bg-primary"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilters;
