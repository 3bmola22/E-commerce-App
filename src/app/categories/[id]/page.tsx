import ProductsCard from "@/app/_components/ProductsCard/ProductsCard";
import { getAllProducts } from "@/app/api/service/service";
import { ProductType } from "@/app/api/types/products.type";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const products: ProductType[] = await getAllProducts();
  async function getSpecificCat() {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    const data = await res.json();
    // console.log("tytyt ", data.data);
    return data.data;
  }
  const { _id } = await getSpecificCat();
  const brandFilter = products.filter((product) => product.category._id == _id);

    // console.log("lll", brandFilter);
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
      <div className="flex flex-wrap">
        {brandFilter.map((product) => {
          return <ProductsCard key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
