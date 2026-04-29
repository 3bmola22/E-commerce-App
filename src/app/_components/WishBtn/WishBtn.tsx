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
      } else if (res.status === "fail" || res.message?.includes("login")) {
        toast.error("🔐 Please login first!", {
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
      } else {
        throw new Error(res.message || "Unknown error");
      }
    } catch (err) {
      // console.log("wish error", err);
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
     });
    }
  }
  return (
    <button className={classes} onClick={() => handleWishProduct(productId)}>
      {children}
    </button>
  );
}
