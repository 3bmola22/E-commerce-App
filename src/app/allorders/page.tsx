"use client";
import { getAllOrders, getUserOrders } from "@/serverAction/orderServer";
import { getRealToken } from "@/utilities";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import MyOrders from "../_components/MyOrders/MyOrders";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { OrdersResponse, ProductType } from "../api/types/products.type";
import {
  Package,
  MapPin,
  Truck,
  Clock,
  ChevronLeft,
  Phone,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";


export default function AllOrdersPage() {
  const [orders, setOrders] = useState<OrdersResponse>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchOrders() {
    try {
      const res = await getAllOrders();

    
    } catch (err) {
      setError(err.message);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  }
  async function fetchUserOrder() {
    const res = await getUserOrders();
    setOrders(res);
    // console.log("rss", res);
  }

  useEffect(() => {
    fetchOrders();
    fetchUserOrder();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className=".w-[90%]">
      {orders.map((order) => {
        return (
          <div className="w-full max-w-6xl mx-auto" key={order.id}>
            {/* الكارت الرئيسي */}
            <Collapsible>
              <div className="bg-white border border-[#BBF7D0] rounded-2xl shadow-[0_10px_15px_-3px_rgba(220,252,231,0.5),0_4px_6px_-4px_rgba(220,252,231,0.5)] overflow-hidden">
                {/* الجزء العلوي - حالة الطلب + رقم الطلب + زر Hide */}
                <div className="flex flex-col items-center pt-6 gap-6 ">
                  <div className="flex items-start w-full max-w-5xl gap-5 px-6">
                    {/* صورة الطلب (placeholder) */}
                    <div className="relative">
                      <div className="w-28 h-28 bg-gradient-to-br from-[#F9FAFB] to-white border border-[#F3F4F6] rounded-2xl p-2.5 flex items-center justify-center">
                        <img
                          src={order.cartItems[0].product.imageCover}
                          alt={order.cartItems[0].product.title}
                          className="w-full h-full  border-2 border-dashed rounded-xl"
                        />
                      </div>
                    </div>

                    {/* تفاصيل الطلب */}
                    <div className="flex-1 flex flex-col gap-3">
                      {/* حالة الطلب + رقم الطلب */}
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-2">
                          {/* Badge Processing */}
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FEF3C6] rounded-lg">
                            <div className="w-3.5 h-3 relative">
                              <div className="absolute inset-x-1 inset-y-0 bg-[#E17100] rounded-sm" />
                            </div>
                            <span className="text-xs font-semibold text-[#E17100]">
                              {order.isDelivered ? "isDelivered" : "Processing"}
                            </span>
                          </div>

                          {/* رقم الطلب */}
                          <h3 className="text-lg font-bold text-[#101828] flex items-center gap-2">
                            <div className="w-3.5 h-3 relative">
                              <div className="absolute inset-x-1 inset-y-0 bg-[#99A1AF] rounded-sm" />
                            </div>
                            {order.id}
                          </h3>
                        </div>

                        {/* أيقونة الإخفاء */}
                        <div className="shrink-0 w-10 h-10 bg-[#F3F4F6] rounded-3xl flex items-center justify-center">
                          <div className="w-5 h-4 relative">
                            <div className="absolute inset-x-1 top-1/4 bottom-1/4 bg-[#4A5565] rounded-sm" />
                          </div>
                        </div>
                      </div>

                      {/* معلومات إضافية */}
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-[#6A7282]">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3 text-[#99A1AF]" />
                          {order.createdAt}
                        </span>
                        <span className="w-1 h-1 bg-[#D1D5DC] rounded-full" />
                        <span className="flex items-center gap-1.5">
                          <Package className="w-3.5 h-3 text-[#99A1AF]" />{" "}
                          {order.cartItems.length} item
                        </span>
                        <span className="w-1 h-1 bg-[#D1D5DC] rounded-full" />
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3 text-[#99A1AF]" />
                          {order.shippingAddress.city}
                        </span>
                      </div>

                      {/* السعر + زر Hide */}
                      <div className="flex justify-between items-center mt-1">
                        <div className="relative">
                          <span className="text-2xl font-bold text-[#101828]">
                            {order.totalOrderPrice}
                          </span>
                          <span className="absolute -top-1 left-12 text-sm font-medium text-[#99A1AF]">
                            EGP
                          </span>
                        </div>

                        <CollapsibleTrigger className="flex items-center gap-2 px-4 py-2.5 bg-[#16A34A] text-white text-sm font-semibold rounded-xl hover:bg-[#138843] transition-all relative overflow-hidden group">
                          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity" />
                          <span className="relative z-10">Details</span>
                          <ChevronLeft className="w-3.5 h-3 rotate-180 relative z-20" />
                        </CollapsibleTrigger>
                      </div>
                    </div>
                  </div>

                  {/* الخط الفاصل */}
                  <div className="w-full border-t border-[#F3F4F6] bg-[#F9FAFB]/50" />

                  {/* الجزء السفلي - تفاصيل الطلب */}
                  <div className="w-full px-6 pb-6 flex flex-col gap-6">
                    {/* Order Items */}
                    <div className="flex flex-col gap-4 ">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[#DCFCE7] rounded-lg flex items-center justify-center">
                          <Package className="w-4 h-4 text-[#16A34A]" />
                        </div>
                        <h4 className="text-sm font-semibold text-[#101828]">
                          Order Items
                        </h4>
                      </div>

                      {order.cartItems.map((item) => {
                        return (
                          <CollapsibleContent key={item.product.id}>
                            <div className="flex items-center gap-4 p-4 bg-white border border-[#F3F4F6] rounded-xl">
                              <div className="w-16 h-16 bg-[#F9FAFB] rounded-xl p-2 flex items-center justify-center">
                                <img
                                  src={item.product.imageCover}
                                  alt={item.product.title}
                                  className="w-full h-full  border-2 border-dashed rounded-lg"
                                />
                              </div>

                              <div className="flex-1">
                                <p className="font-medium text-[#101828]">
                                  {item.product.title}
                                </p>
                                <p className="text-sm text-[#364153]">
                                  {item.count} × {item.price} EGP
                                </p>
                              </div>

                              <div className="text-right">
                                <p className="text-lg font-bold text-[#101828]">
                                  {item.count * item.price}
                                </p>
                                <p className="text-xs text-[#99A1AF]">EGP</p>
                              </div>
                            </div>
                          </CollapsibleContent>
                        );
                      })}
                    </div>

                    {/* Delivery Address + Order Summary */}
                    <div className="flex gap-4">
                      {/* Delivery Address */}
                      <div className="flex-1 p-4 bg-white border border-[#F3F4F6] rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-6 h-6 bg-[#DCFCE7] rounded-lg flex items-center justify-center">
                            <Truck className="w-4 h-4 text-[#155DFC]" />
                          </div>
                          <h4 className="text-sm font-semibold text-[#101828]">
                            Delivery Address
                          </h4>
                        </div>

                        <div className="space-y-2">
                          <p className="font-medium text-[#101828]">
                            {" "}
                            {order.shippingAddress.city}
                          </p>
                          <p className="text-sm text-[#4A5565]">
                            {order.shippingAddress.details}
                          </p>
                          <p className="text-sm text-[#4A5565] flex items-center gap-2">
                            <Phone className="w-3.5 h-3.5 text-[#99A1AF]" />
                            {order.shippingAddress.phone}
                          </p>
                        </div>
                      </div>

                      {/* Order Summary */}
                      <div className="flex-1 p-4 bg-[#FEF3C6] border border-[#FEE685] rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-6 h-6 bg-[#FE9A00] rounded-lg flex items-center justify-center">
                            <Package className="w-4 h-4 text-white" />
                          </div>
                          <h4 className="text-sm font-semibold text-[#101828]">
                            Order Summary
                          </h4>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#4A5565]">Subtotal</span>
                            <span className="font-medium text-[#4A5565]">
                              {order.totalOrderPrice} EGP
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[#4A5565]">Shipping</span>
                            <span className="font-medium text-[#4A5565]">
                              Free
                            </span>
                          </div>
                          <hr className="border-t border-[#E5E7EB]/50" />
                          <div className="flex justify-between items-end pt-1">
                            <span className="text-sm font-semibold text-[#101828]">
                              Total
                            </span>
                            <span className="text-lg font-bold text-[#101828]">
                              {order.totalOrderPrice} EGP
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Collapsible>
          </div>
        );
      })}
    </div>
  );
}
