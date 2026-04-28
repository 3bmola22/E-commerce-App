import ProductsCard from "@/app/_components/ProductsCard/ProductsCard";
import { getAllProducts } from "@/app/api/service/service";
import { ProductType } from "@/app/api/types/products.type";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { id } = await params;
  const products: ProductType[] = await getAllProducts();
  async function getBrands() {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    const data = await res.json();
    // console.log("hhhh", data.data);
    return data.data;
  }
  const { _id } = await getBrands();
  const brandFilter = products.filter((product) => product.brand._id == _id);

//   console.log("lll", brandFilter);
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
