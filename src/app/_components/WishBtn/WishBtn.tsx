"use client";
import { wishProduct } from "@/serverAction/wishServer";
import { getRealToken } from "@/utilities";
import React from "react";
import { CiHeart } from "react-icons/ci";

import { Bounce, toast } from "react-toastify";
import { ContextCart } from "../ContextProvider/ContextUsrCart";

export default function WishBtn({
  children,
  productId,
  classes,
}: {
  children: React.ReactNode;
  productId: string;
  classes: string;
}) {
  async function handleWishProduct(productId: string) {
    try {
      const res = await wishProduct(productId);
      // console.log("tutu", res);
      if (res.status === "success") {
        toast.success("👌 Done!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        // setcartcount(cartcount + 1);
      } 
    } catch (err) {
     toast.error("💥 Error!", {
       position: "top-center",
       autoClose: 3000,
       hideProgressBar: false,
       closeOnClick: false,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
       theme: "light",
       transition: Bounce,
     });;
    }
  }
  return (
    <button className={classes} onClick={() => handleWishProduct(productId)}>
      {children}
    </button>
  );
}
