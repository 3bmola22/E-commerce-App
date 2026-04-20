"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";

import { getCart } from "@/serverAction/getProductCarsServer";
import UpdateCartQuantity from "../_components/UpdateCarQuantity/UpdateCartQuantity";
import { ContextCart } from "@/app/_components/ContextProvider/ContextUsrCart";

import type {
  AddToCartResponse,
  CartProduct,
  WishlistProductType,
  WishlistResponseType,
} from "../api/types/products.type";
import { deleteProductWish, getWish } from "@/serverAction/wishServer";
import { FaShoppingCart } from "react-icons/fa";
import AddBtn from "../_components/AddBtn/AddBtn";
import WishBtnDelete from "./../_components/WishBtnDelete/WishBtnDelete";

export default function wishlist() {
  const [allWish, setallWish] = useState<WishlistResponseType | null>(null);
  const [allProductsWish, setallProductsWish] = useState<
    WishlistProductType[] | null
  >(null);
  const [isLoading, setisLoading] = useState(false);
  const { cartcount, setcartcount } = useContext(ContextCart);

  async function getUserWishlist() {
    setisLoading(true);
    const data = await getWish();
    // console.log("ghgh",data)
    setallWish(data);
    setallProductsWish(data?.data || null);
    if (data?.status === "success") {
      setisLoading(false);
    } else {
      setisLoading(false);
    }
  }

  async function handleDeleteProduct(id: string, count: number) {
    const data = await deleteProductWish(id);

    setallProductsWish(data?.data.products);
    setallWish(data);
    console.log("trrr", data);
    if (data?.status === "success") {
      toast.success("Product cleared successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      setcartcount(cartcount - count);
    }
  }

  async function handleDeleteCart() {
    const data = await deleteCart();
    setallProductsWish(data?.data.products || null);
    setallWish(data);

    if (data?.status === "success") {
      toast.success("Cart cleared successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      setcartcount(0);
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white border border-[#F3F4F6] rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 px-6 py-4 bg-[#F9FAFB] gap-4 text-sm font-medium text-[#6A7282]">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Items */}
          <div className="divide-y divide-gray-200">
            {allProductsWish?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 items-center px-6 py-5 gap-4 hover:bg-gray-50 transition"
              >
                {/* Product */}
                <div className="col-span-6 flex items-center gap-4">
                  <div className="w-20 h-20 bg-[#F9FAFB] border border-[#F3F4F6] rounded-xl flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      className="w-20 h-20 bg-gray-200 border-2 border-dashed rounded"
                    />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-[#101828] font-medium text-base leading-6 truncate">
                      {item.title}
                    </p>
                    <p className="text-[#99A1AF] text-sm font-medium">
                      {item?.category?.name}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="col-span-2 flex flex-col items-center gap-1">
                  <span className="text-[#101828] font-semibold text-base">
                    {item.priceAfterDiscount}
                  </span>
                  {item.priceAfterDiscount ? (
                    <span className="text-[#99A1AF] text-sm line-through">
                      {item.price}
                    </span>
                  ) : (
                    <span className="text-[#101828] font-semibold text-base">
                      {item.price}
                    </span>
                  )}
                </div>

                {/* Status */}
                <div className="col-span-2 flex justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0FDF4] rounded-full text-xs">
                    <span className="w-1.5 h-1.5 bg-[#00C950] rounded-full" />
                    <span className="text-[#008236] font-medium">In Stock</span>
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-center gap-2">
                  <AddBtn
                    productId={item._id}
                    classes={
                      "flex cursor-pointer items-center justify-center gap-2 px-4 py-2.5 bg-[#16A34A] text-white rounded-lg hover:bg-[#138843] transition text-sm font-medium"
                    }
                  >
                    <FaShoppingCart className="w-4 h-4" />
                    Add to Cart
                  </AddBtn>
                  <WishBtnDelete
                    allProductsWish={allProductsWish}
                    allWish={allWish}
                    count={"وقفنا هنا"}
                    id={item._id}
                    setallWish={setallWish}
                    setallProductsWish={setallProductsWish}
                  >
                    <Trash2 className="w-4 h-4 text-[#99A1AF]" />
                  </WishBtnDelete>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping */}
        <div className="mt-8">
          <Link
            href="/"
            className="text-[#6A7282] text-sm font-medium hover:underline flex items-center gap-2"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
