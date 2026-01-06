import React from "react";
import { Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { LeafCluster } from "../LandingPage/LeafDecoration";
import SelectField from "@/components/shared/fields/select-field";
import ProductCard from "./ProductCard";
import ViewModeToggle from "./ViewModeToggle";
import EmptyProductList from "./EmptyProductList";
import Typography from "@/components/ui/typography";
import { Grid, GridItem } from "@/components/grid";

const categories = [
  "All",
  "Electronics",
  "Clothing",
  "Home & Garden",
  "Sports",
  "Books",
];
const priceRanges = [
  "All Prices",
  "Under $25",
  "$25 - $50",
  "$50 - $100",
  "Over $100",
];

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 129.99,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: 45.0,
    category: "Clothing",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 199.99,
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Plant Pot Set",
    price: 34.99,
    category: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=300&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Bestseller Novel",
    price: 15.99,
    category: "Books",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Yoga Mat",
    price: 29.99,
    category: "Sports",
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Desk Lamp",
    price: 55.0,
    category: "Home & Garden",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop",
  },
];

const filterByPrice = (price: number, range: string): boolean => {
  switch (range) {
    case "Under $25":
      return price < 25;
    case "$25 - $50":
      return price >= 25 && price <= 50;
    case "$50 - $100":
      return price >= 50 && price <= 100;
    case "Over $100":
      return price > 100;
    default:
      return true;
  }
};

const Shop = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [selectedPrice, setSelectedPrice] = React.useState("All Prices");
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = React.useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = filterByPrice(product.price, selectedPrice);
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen relative overflow-hidden my-8">
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-6">
        <LeafCluster />
        {/* Page Header */}
        <div className="text-center mt-12 mb-8 animate-fade-in-up space-y-3 ">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Care made simple
          </div>
          <Typography
            variant="h1"
            className="font-semibold text-5xl text-primary text-center"
          >
            Support That Matters
          </Typography>
          <Typography
            variant="caption"
            className="text-muted-foreground text-center"
          >
            Carefully chosen ways to show support when it’s needed most.
          </Typography>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-card rounded-2xl shadow-sm p-4 mb-8 animate-fade-in-up animation-delay-100">
          <Grid>
            {/* Search Input */}
            <GridItem className="relative flex-1 col-span-6 md:col-span-4 lg:col-span-7">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-md border-border bg-background"
              />
            </GridItem>

            {/* Category Select */}
            <GridItem className="col-span-6 md:col-span-3 lg:col-span-2">
              <SelectField
                value={selectedCategory}
                onChange={setSelectedCategory}
                options={categories}
                placeholder="Category"
              />
            </GridItem>

            {/* Price Range Select */}
            <GridItem className="col-span-6 md:col-span-3 lg:col-span-2">
              <SelectField
                value={selectedPrice}
                onChange={setSelectedPrice}
                options={priceRanges}
                placeholder="Price Range"
              />
            </GridItem>

            {/* Filter Toggle (Mobile) */}
            <GridItem className="col-span-6 md:hidden">
              <Button
                variant="outline"
                className="md:hidden h-12 rounded-md w-full"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filters
              </Button>
            </GridItem>

            {/* View Mode Toggle */}
            <GridItem className="col-span-1 md:col-span-2 lg:col-span-1">
              <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
            </GridItem>
          </Grid>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <div className="md:hidden mt-4 pt-4 border-t border-border space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox id="inStock" />
                <label htmlFor="inStock" className="text-sm text-foreground">
                  In Stock Only
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="onSale" />
                <label htmlFor="onSale" className="text-sm text-foreground">
                  On Sale
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="freeShipping" />
                <label
                  htmlFor="freeShipping"
                  className="text-sm text-foreground"
                >
                  Free Shipping
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6 animate-fade-in-up animation-delay-200">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="text-foreground font-medium">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
          <Select defaultValue="featured">
            <SelectTrigger className="w-48 rounded-xl bg-card shadow-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <div
          className={`grid gap-6 mb-12 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              viewMode={viewMode}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && <EmptyProductList />}
      </div>
    </div>
  );
};

export default Shop;
