import { ProductType } from "@/app/api/types/products.type";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import Rate from "../Rate/Rate";
import AddBtn from "../AddBtn/AddBtn";
import WishBtn from "../WishBtn/WishBtn";

export default function ProductsCard({ product }: { product: ProductType }) {
  return (
    <div className="w-full min-[480px]:w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2 sm:p-3">
      <div
        className="group border border-slate-200 rounded-lg sm:rounded-xl overflow-hidden relative
                      hover:shadow-lg transition-all duration-300 bg-white h-full hover:translate-y-[-10px]"
      >
        <div className="p-2 sm:p-3">
          <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-2 sm:mb-3">
            <img
              src={product.imageCover}
              alt={product.title}
              className="object-cover w-full h-full "
            />
          </div>

          <p className="text-xs sm:text-sm text-gray-500 font-medium line-clamp-1">
            {product?.category?.name}
          </p>

          <Link
            href={`/productdetails/${product._id}`}
            className="font-semibold text-sm sm:text-base  mt-1 mb-1 sm:mb-2  line-clamp-2 "
          >
            {product.description}
          </Link>

          <Rate product={product} />
          <div className="mt-2 sm:mt-3 font-bold text-sm sm:text-base text-green-600 flex gap-1 sm:gap-2 items-center justify-between">
            <span className="truncate">
              {product.priceAfterDiscount || product.price} EGP
            </span>
            {product.priceAfterDiscount && (
              <p className="text-slate-700 text-xs sm:text-sm line-through">
                {product.price}
              </p>
            )}
            <AddBtn
              productId={product.id}
              classes={`bg-green-600 text-white text-lg sm:text-2xl font-bold rounded-full w-9 h-9 sm:w-12 sm:h-12 cursor-pointer flex-shrink-0`}
            >
              +
            </AddBtn>
          </div>
        </div>
        <div className="flex flex-col absolute top-3 sm:top-6 right-2 sm:right-3 gap-1 sm:gap-2">
          <WishBtn productId={product.id}>
            <CiHeart className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white text-gray-600 p-1 font-bold hover:text-red-600 border border-gray-200 sm:border-2 hover:shadow-lg cursor-pointer" />
          </WishBtn>
          <TfiReload className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white text-gray-600 p-1 font-bold hover:text-green-600 border border-gray-200 sm:border-2 hover:shadow-lg cursor-pointer" />
          <Link href={`/productdetails/${product._id}`}>
            <FaRegEye className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white text-gray-600 p-1 font-bold hover:text-green-600 border border-gray-200 sm:border-2 hover:shadow-lg" />
          </Link>
        </div>
      </div>
    </div>
  );
}
