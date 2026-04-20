"use client";
import { getCart } from "@/serverAction/getProductCarsServer";
import React, { createContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
export const ContextCart = createContext();
export default function ContextUsrCart({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartcount, setcartcount] = useState(0);

  async function getUsrCart() {
    try {
      const data = await getCart();
      //   console.log("dataa", data?.data.products);

      let allCount = 0;
      data.data.products.forEach((product) => {
        allCount += product.count;
      });
      setcartcount(allCount);
      console.log("dataa", allCount);
    } catch (error) {
      console.log(error);
      toast.error("Please Login frirst", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }
  useEffect(() => {
    getUsrCart();
  }, []);
  return (
    <ContextCart.Provider value={{ cartcount, setcartcount }}>
      {children}
    </ContextCart.Provider>
  );
}
