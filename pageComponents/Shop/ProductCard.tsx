import React from "react";
import Image from "next/image";
import type { ProductType } from "@/utilities/types/product";
import { cn } from "@/lib/utils";
import EllipsisTypography from "@/components/shared/EllipsisTypography";
import useGetAllProductTypes from "@/hooks/product-types/useGetAllProductTypes";
import type { ProductTypesType } from "@/utilities/types/product-type";

type Props = {
  index: number;
  product: ProductType | undefined;
  classname?: string;
  onCardClick?: (product: ProductType) => void;
};

function ProductCard({ index, product, classname, onCardClick }: Props) {
  const { data: productCategory } = useGetAllProductTypes();

  const categoryMap: Record<number, ProductTypesType> =
    productCategory?.reduce<Record<number, ProductTypesType>>(
      (acc, category) => {
        acc[category.id] = category;
        return acc;
      },
      {}
    ) ?? {};

  const handleProductSelection = () => {
    if (onCardClick) {
      onCardClick(product!);
    }
  };

  return (
    <div
      className={cn(
        "bg-card cursor-pointer rounded-md shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up",
        classname
      )}
      style={{ animationDelay: `${(index + 3) * 50}ms` }}
      onClick={handleProductSelection}
    >
      <div className={`relative`}>
        <Image
          src={product?.image_url || ""}
          alt={product?.name || ""}
          width={400}
          height={400}
          className={`w-full object-cover h-48`}
        />
        <span className="absolute top-3 right-3 bg-linear-to-r from-primary to-secondary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
          {categoryMap[product?.category as number]?.name ?? "Uncategorized"}
        </span>
      </div>
      <div className="p-4 flex-1">
        <EllipsisTypography className="text-sm font-medium text-foreground mb-2 md:line-clamp-1">
          {product?.name}
        </EllipsisTypography>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${product?.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
