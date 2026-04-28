"use client";

import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";

import { getCart } from "@/serverAction/getProductCarsServer";
import { deleteProduct } from "@/serverAction/deleteProductCartServer";
import { deleteCart } from "@/serverAction/deleteAllCart";
import UpdateCartQuantity from "../_components/UpdateCarQuantity/UpdateCartQuantity";
import { ContextCart } from "@/app/_components/ContextProvider/ContextUsrCart";

import type {
  AddToCartResponse,
  CartProduct,
  CartType,
} from "../api/types/products.type";
import DeleteProduct from "../_components/DeleteProduct/DeleteProduct";

export default function userCartPage() {
  const [allCart, setallCart] = useState<AddToCartResponse | null>(null);
  const [allProducts, setallProducts] = useState<CartProduct[] | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [cartId, setcartId] = useState(null)
        const { cartcount, setcartcount } = useContext(ContextCart);


  async function getUserCart() {
    setisLoading(true)
    
    const data = await getCart();
    setallCart(data);
    setcartId(data.cartId);
    setallProducts(data?.data.products || null);
    if (data?.status === "success") {
      setisLoading(false)
    }else{setisLoading(false)}
  }

 

  async function handleDeleteCart() {
    const data = await deleteCart();
    setallProducts(data?.data.products || null);
    setallCart(data);

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
      setcartcount(0)
    }
  }

  useEffect(() => {
    getUserCart();
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

      <div className="flex flex-col items-start p-0 px-4 gap-8 w-[1024px] max-w-[1024px] min-h-[1087.5px] mx-auto font-['Exo']">
        {/* Header Section */}
        <div className="flex flex-col items-start p-0 gap-4 w-full h-[116px]">
          <nav className="flex flex-row items-center p-0 gap-2 w-full h-5">
            <Link
              href="/"
              className="flex flex-col items-start p-0 w-[39px] h-5 text-[#6A7282] font-medium text-sm leading-5"
            >
              Home
            </Link>
            <span className="flex flex-col items-start p-0 w-1.5 h-5 text-[#6A7282] font-medium text-sm leading-5">
              /
            </span>
            <span className="flex flex-col items-start p-0 w-[92px] h-5 text-[#101828] font-medium text-sm leading-5">
              Shopping Cart
            </span>
          </nav>

          <div className="flex flex-row items-center p-0 w-full h-20">
            <div className="flex flex-col items-start p-0 gap-2 w-[258px] h-20">
              <h1 className="flex flex-row items-center p-0 gap-3 w-full h-12">
                <span className="flex flex-row justify-center items-center p-0 w-12 h-12 bg-gradient-to-r from-[#16A34A] to-[#15803D] rounded-xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </span>
                <span className="w-[198px] h-9 text-[#101828] font-bold text-[30px] leading-9">
                  Shopping Cart
                </span>
              </h1>
              <p className="flex flex-col items-start p-0 w-full h-6 text-[#6A7282] font-medium text-base leading-6">
                You have {allCart?.numOfCartItems || 0} items in your cart
              </p>
            </div>
          </div>
        </div>

        {/* Main Grid Section */}
        <div className="flex flex-row justify-center items-start p-0 gap-8 w-full h-[939.5px]">
          {/* Cart Items List */}
          <div className="flex flex-col items-start p-0 gap-6 w-[650.66px] h-full">
            <div className="flex flex-col items-start p-0 gap-4 w-full h-[870.5px]">
              {allProducts?.map((item) => (
                <div
                  key={item.product.id}
                  className="relative box-border flex flex-col items-start p-5 w-full h-[205.62px] bg-white border border-[#F3F4F6] rounded-2xl shadow-sm"
                >
                  <div className="flex flex-row items-start p-0 gap-6 w-full h-[163.62px] z-10">
                    {/* Image */}
                    <div className="relative flex flex-col items-start p-0 w-32 h-full shrink-0">
                      <div className="box-border flex flex-col justify-center items-start p-3 w-32 h-32 bg-gradient-to-br from-[#F9FAFB] via-white to-[#F3F4F6] border border-[#F3F4F6] rounded-xl">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-[102px] h-[102px] object-contain"
                        />
                      </div>

                      <div className="absolute flex flex-row items-center px-2 py-0.5 gap-1 w-[67px] h-[19px] right-[-4.14px] bottom-[30px] bg-[#00C950] rounded-full">
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="white"
                        >
                          <path d="M3.5 8L0 4.5l1.4-1.4L3.5 5.2 8.6 0 10 1.4z" />
                        </svg>
                        <span className="text-white font-semibold text-[10px] leading-[15px]">
                          In Stock
                        </span>
                      </div>
                    </div>

                    {/* Item Details */}
                    <div className="flex flex-col justify-between items-start p-0 w-full h-full">
                      <div className="flex flex-col items-start p-0 pb-3 w-full">
                        <div className="flex flex-col items-start p-0 gap-2 w-full">
                          <h2 className="text-[#101828] font-semibold text-[18px] leading-[29px] truncate w-full">
                            {item.product.title}
                          </h2>
                          <div className="flex flex-row items-center p-0 gap-2 w-full h-6">
                            <span className="flex flex-col items-start px-2.5 py-1 bg-gradient-to-r from-[#F0FDF4] to-[#F3F4F6] rounded-full text-[#15803D] font-medium text-xs">
                              {item.product.category?.name}
                            </span>
                            <span className="text-[#99A1AF] text-xs">•</span>
                            <span className="text-[#6A7282] font-medium text-xs">
                              SKU: {item.product._id}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-row items-baseline p-0 pb-4 gap-2 w-full h-11">
                        <span className="text-[#16A34A] font-bold text-lg leading-7">
                          {item.product.price} EGP
                        </span>
                        <span className="text-[#99A1AF] font-medium text-xs">
                          per unit
                        </span>
                      </div>

                      <div className="flex flex-row justify-between items-center p-0 w-full h-[46px] mt-auto">
                        <UpdateCartQuantity
                          isLoading={isLoading}
                          setallCart={setallCart}
                          setallProducts={setallProducts}
                          id={item.product.id}
                          count={item.count}
                        />

                        <div className="flex flex-row items-center gap-4 h-[46px]">
                          <div className="flex flex-col items-end gap-0.5">
                            <p className="text-[#99A1AF] font-medium text-xs text-right">
                              Total
                            </p>
                            <p className="text-[#101828] font-bold text-xl text-right">
                              {(item.price * item.count).toFixed(2)}
                              <span className="text-[#99A1AF] font-medium text-sm">
                                EGP
                              </span>
                            </p>
                          </div>

                          <DeleteProduct
                            count={item.count}
                            id={item.product.id}
                            setallCart={setallCart}
                            setallProducts={setallProducts}
                          >
                            <Trash2
                              className="w-[17.5px] h-[17.5px] text-[#FB2C36]"
                              strokeWidth={2.5}
                            />
                          </DeleteProduct>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions */}
            <div className="box-border flex flex-row justify-between items-center pt-6 w-full h-[45px] border-t border-[#E5E7EB]">
              <Link
                href="/"
                className="flex flex-row items-center gap-2 text-[#16A34A] font-medium text-sm leading-5 hover:underline"
              >
                ← Continue Shopping
              </Link>

              <button
                disabled={isLoading}
                onClick={handleDeleteCart}
                className="cursor-pointer disabled:cursor-progress flex flex-row items-center gap-2 text-[#99A1AF] font-medium text-sm hover:text-red-600 transition-colors"
              >
                <svg
                  width="15"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
                Clear all items
              </button>
            </div>
          </div>

          {/* Sidebar Order Summary */}
          <div className="flex flex-col items-start p-0 w-[309.34px] h-[939.5px]">
            <div className="box-border flex flex-col items-start p-0 w-full h-[617px] bg-white border border-[#F3F4F6] shadow-md rounded-2xl overflow-hidden">
              {/* Order Summary Header */}
              <div className="flex flex-col items-start px-6 py-4 gap-1 w-full h-[84px] bg-gradient-to-r from-[#16A34A] to-[#15803D]">
                <h2 className="flex flex-row items-center gap-2 text-white font-bold text-lg leading-7">
                  <svg width="22" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h10v2H7zm0 4h7v2H7zm0-8h10v2H7z" />
                  </svg>
                  Order Summary
                </h2>
                <p className="text-[#DCFCE7] font-medium text-sm">
                  {allCart?.numOfCartItems || 0} items in your cart
                </p>
              </div>

              <div className="flex flex-col items-start p-6 gap-5 w-full h-[531px]">
                {/* Free Shipping */}
                <div className="flex flex-row items-center p-4 gap-3 w-full h-24 bg-gradient-to-r from-[#F0FDF4] to-[#F3F4F6] rounded-xl">
                  <div className="flex justify-center items-center w-10 h-10 bg-[#DCFCE7] rounded-full">
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="#00A63E"
                    >
                      <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-start p-0">
                    <p className="text-[#008236] font-semibold text-base">
                      Free Shipping!
                    </p>
                    <p className="text-[#00A63E] font-medium text-sm">
                      You qualify for free delivery
                    </p>
                  </div>
                </div>

                {/* Price Details */}
                <div className="flex flex-col items-start p-0 gap-3 w-full h-[117px]">
                  <div className="flex flex-row justify-between w-full h-6">
                    <span className="text-[#4A5565] font-medium text-base">
                      Subtotal
                    </span>
                    <span className="text-[#101828] font-medium text-base">
                      {allCart?.data.totalCartPrice || 0} EGP
                    </span>
                  </div>
                  <div className="flex flex-row justify-between w-full h-6">
                    <span className="text-[#4A5565] font-medium text-base">
                      Shipping
                    </span>
                    <span className="text-[#00A63E] font-medium text-base">
                      FREE
                    </span>
                  </div>

                  <div className="box-border w-full pt-3 mt-1 border-t border-dashed border-[#E5E7EB]">
                    <div className="relative flex flex-row justify-between items-center w-full h-8">
                      <span className="text-[#101828] font-semibold text-base">
                        Total
                      </span>
                      <div className="flex flex-row items-baseline gap-1">
                        <span className="text-[#101828] font-bold text-2xl">
                          {allCart?.data.totalCartPrice || 0}
                        </span>
                        <span className="text-[#6A7282] font-medium text-sm">
                          EGP
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo Code */}
                <button
                  disabled={isLoading}
                  className="box-border flex flex-row justify-center items-center py-3 gap-2 w-full h-[46px] border border-dashed border-[#D1D5DC] rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <svg
                    width="20"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4A5565"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5m-5 5V3" />
                  </svg>
                  <span className="text-[#4A5565] font-medium text-sm">
                    Apply Promo Code
                  </span>
                </button>

                {/* Checkout Button */}
                <Link
                  href={`/checkout/${cartId}`}
                  className="relative flex flex-row justify-center items-center py-4 px-6 gap-3 w-full h-14 bg-gradient-to-r from-[#16A34A] to-[#15803D] rounded-xl shadow-[0px_10px_15px_-3px_rgba(22,163,74,0.2)] hover:brightness-105 transition-all"
                >
                  <svg width="20" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                  </svg>
                  <span className="text-white font-semibold text-base">
                    Secure Checkout
                  </span>
                </Link>

                {/* Trust Badges */}
                <div className="flex flex-row justify-center items-center py-2 gap-4 w-full h-8">
                  <div className="flex flex-row items-center gap-1.5 h-4">
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#00C950"
                    >
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                    </svg>
                    <span className="text-[#6A7282] font-medium text-[12px]">
                      Secure Payment
                    </span>
                  </div>
                  <div className="w-[1px] h-4 bg-[#E5E7EB]"></div>
                  <div className="flex flex-row items-center gap-1.5 h-4">
                    <svg
                      width="15"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="#2B7FFF"
                    >
                      <path d="M13 3H4v18h16V7l-7-4zm3 14H8v-2h8v2zm0-4H8v-2h8v2zm-3-4H8V7h5v2z" />
                    </svg>
                    <span className="text-[#6A7282] font-medium text-[12px]">
                      Fast Delivery
                    </span>
                  </div>
                </div>

                <Link
                  href="/"
                  className="block w-full text-center py-2 text-[#16A34A] font-medium text-sm hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
