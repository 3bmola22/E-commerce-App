import { CategoryType } from "@/app/api/types/products.type";
import React from "react";

export default function MyCategories({
  category,
}: {
  category: CategoryType | undefined;
}) {
  return (
    <div className="group border-2 border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white">
      <div className="  flex justify-center items-center bg-gray-100 rounded p-4">
        <div className="over-flow-hidden h-22 w-22 rounded-full overflow-hidden">
          <img
            src={category?.image}
            alt={category?.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="p-4 text-center">
        <h1 className="font-semibold text-base line-clamp-2 min-h-[2.5rem]">
          {category?.name}
        </h1>
      </div>
    </div>
  );
}
