import { getAllProducts } from "@/app/api/service/service";
import React from "react";
import ProductsCard from "../ProductsCard/ProductsCard";

export default async function FeaturedProducts() {
  const allProducts = await getAllProducts();
  return (
    <>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <h1 className="border-s-4 sm:border-s-6 border-green-600 p-2 sm:p-3 my-4 sm:my-6 text-2xl sm:text-3xl lg:text-4xl font-bold">
          Featured
          <span className="font-semibold text-green-600"> Products</span>
        </h1>
        <div className="flex flex-wrap">
          {allProducts?.map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
