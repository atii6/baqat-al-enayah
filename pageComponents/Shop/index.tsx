import React from "react";
import { SlidersHorizontal, Sparkles } from "lucide-react";
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
import SelectField, {
  type SelectOption,
} from "@/components/shared/fields/select-field";
import ProductCard from "./ProductCard";
import EmptyProductList from "./EmptyProductList";
import Typography from "@/components/ui/typography";
import { Grid, GridItem } from "@/components/grid";
import SearchField from "@/components/shared/SearchField";
import useGetAllProducts from "@/hooks/product/useGetAllProducts";
import useGetAllProductTypes from "@/hooks/product-types/useGetAllProductTypes";

type PriceRangeValue = "all" | "under-25" | "25-50" | "50-100" | "over-100";

const priceRanges: SelectOption<PriceRangeValue>[] = [
  { label: "All Prices", value: "all" },
  { label: "Under $25", value: "under-25" },
  { label: "$25 - $50", value: "25-50" },
  { label: "$50 - $100", value: "50-100" },
  { label: "Over $100", value: "over-100" },
];

const filterByPrice = (price: number, range: PriceRangeValue): boolean => {
  switch (range) {
    case "under-25":
      return price < 25;
    case "25-50":
      return price >= 25 && price <= 50;
    case "50-100":
      return price >= 50 && price <= 100;
    case "over-100":
      return price > 100;
    case "all":
    default:
      return true;
  }
};

const Shop = () => {
  const { data: allProducts } = useGetAllProducts();
  const { data: productCategory } = useGetAllProductTypes();

  const categories: SelectOption<CategorySelectValue>[] = React.useMemo(
    () => [
      { label: "All", value: "all" },
      ...(productCategory?.map((category) => ({
        label: category.name,
        value: category.id,
      })) ?? []),
    ],
    [productCategory]
  );

  const [searchQuery, setSearchQuery] = React.useState("");
  type CategorySelectValue = number | "all";

  const [selectedCategory, setSelectedCategory] =
    React.useState<CategorySelectValue>("all");

  const [selectedPrice, setSelectedPrice] =
    React.useState<PriceRangeValue>("all");

  const [showFilters, setShowFilters] = React.useState(false);

  const filteredProducts = React.useMemo(
    () =>
      allProducts?.filter((product) => {
        const matchesSearch = product.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesCategory =
          selectedCategory === "all" || product.category === selectedCategory;

        const matchesPrice = filterByPrice(product.price || 0, selectedPrice);

        return matchesSearch && matchesCategory && matchesPrice;
      }),
    [allProducts, searchQuery, selectedCategory, selectedPrice]
  );

  return (
    <div className="min-h-screen relative overflow-hidden my-8">
      <div className="relative z-10 px-4 md:px-8 lg:px-16 py-16">
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
        <div className="bg-card rounded-md shadow-sm p-4 mb-8 animate-fade-in-up animation-delay-100">
          <Grid>
            {/* Search Input */}
            <GridItem className="relative flex-1 col-span-6 md:col-span-4 lg:col-span-7">
              <SearchField
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                placeholder="Search products..."
              />
            </GridItem>

            {/* Category Select */}
            <GridItem className="col-span-6 md:col-span-3 lg:col-span-3">
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
              {filteredProducts?.length}
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
        <Grid className="gap-6">
          {filteredProducts?.map((product, index) => (
            <GridItem
              className={
                "col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
              }
              key={product.id}
            >
              <ProductCard product={product} index={index} />
            </GridItem>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredProducts?.length === 0 && <EmptyProductList />}
      </div>
    </div>
  );
};

export default Shop;
