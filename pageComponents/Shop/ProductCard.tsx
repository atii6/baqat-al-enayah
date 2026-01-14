import Image from "next/image";
import React from "react";

type Props = {
  index: number;
  product: {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
  };
};

function ProductCard({ index, product }: Props) {
  return (
    <div
      className={`bg-card rounded-md shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up`}
      style={{ animationDelay: `${(index + 3) * 50}ms` }}
    >
      <div className={`relative`}>
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={400}
          className={`w-full object-cover h-48`}
        />
        <span className="absolute top-3 right-3 bg-linear-to-r from-primary to-secondary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>
      <div className="p-4 flex-1">
        <h3 className="font-medium text-foreground mb-2">{product.name}</h3>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">
            ${product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
