"use client";
import { addProductCartServer } from "@/serverAction/addProductCartServer";
import React, { useContext } from "react";
import { Bounce, toast } from "react-toastify";
import { ContextCart } from "../ContextProvider/ContextUsrCart";

export default function AddBtn({
  children,
  classes,
  productId,
}: {
  classes: string;
  children: React.ReactNode;
  productId: string;
}) {
  const { cartcount, setcartcount } = useContext(ContextCart);

  async function addProductCart(e: React.MouseEvent) {
    e.preventDefault();

    try {
      const res = await addProductCartServer(productId);
      

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
        setcartcount(cartcount + 1);
      } else {
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
    } catch (err) {
      console.log("llllllll", err);
      toast.warn("🦄 Login First!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
      // console.log("iddddd", err);
    }
  }
  return (
    <button onClick={addProductCart} className={classes}>
      {children}
    </button>
  );
}
