import { Search } from "lucide-react";
import React from "react";

function EmptyProductList() {
  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground mb-2">
        No products found
      </h3>
      <p className="text-muted-foreground">
        Try adjusting your search or filters
      </p>
    </div>
  );
}

export default EmptyProductList;
