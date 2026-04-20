import React from "react";
import { CiStar } from "react-icons/ci";
import { ProductType } from "../../api/types/products.type";

export default function Rate({
  product,
}: {
  product: Promise<ProductType | undefined>;
}) {
  const rating = Math.round(product.ratingsAverage);
  return (
    <div className="flex items-center gap-2 text-xs sm:text-sm">
      <div className="flex text-yellow-400">
        {Array.from({ length: 5 }, (_, i) => (
          <CiStar
            key={i}
            size={14}
            className={`sm:w-4.5 sm:h-4.5 ${i < rating ? "fill-current" : ""}`}
          />
        ))}
      </div>
      <p className="text-shadow-black hidden sm:block">
        {product.ratingsAverage}
      </p>
    </div>
  );
}
