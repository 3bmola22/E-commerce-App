import { getAllCategories } from "@/app/api/service/service";
import { CategoryType } from "@/app/api/types/products.type";
import React from "react";
import MyCategories from "./../MyCategories/MyCategories";
import Link from "next/link";

export default async function AllMyCategories() {
  const allCategories = await getAllCategories();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className=" border-s-6 border-green-600 p-3 my-4">
          Featured
          <span className="font-semibold text-green-600 ">Categories</span>
        </div>
        <div className="">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {allCategories?.map((category: CategoryType) => (
              <Link key={category._id} href={`categories/${category._id}`}>
                <MyCategories category={category} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
