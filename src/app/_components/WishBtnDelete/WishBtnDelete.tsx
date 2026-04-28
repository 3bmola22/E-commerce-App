import { deleteProduct } from "@/serverAction/deleteProductCartServer";
import { Trash2 } from "lucide-react";
import React, { useContext } from "react";
import { Bounce, toast } from "react-toastify";
import { ContextCart } from "../ContextProvider/ContextUsrCart";
import { deleteProductWish, getWish } from "@/serverAction/wishServer";

export default function WishBtnDelete({
  id,
  allProductsWish,
  allWish,
  setallProductsWish,
  setallWish,
  children,
}) {
  //   const { cartcount, setcartcount } = useContext(ContextCart);

  async function handleDeleteProduct(id: string) {
    // console.log("trrr", id);
    const res = await deleteProductWish({ id });

    
    if (res?.status === "success") {
            const data =await getWish()
// console.log("sksk", data);
      setallProductsWish(data.data);
      setallWish(data);
      toast.success("Product removed successfully to your wishlist", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
      //   setcartcount(cartcount - count);
    }
  }
  return (
    <button
      onClick={() => handleDeleteProduct(id)}
      className="cursor-pointer disabled:cursor-progress flex items-center justify-center w-10 h-10 p-0 bg-[#FEF2F2] border border-[#FFC9C9] rounded-xl hover:bg-red-50 transition-colors"
    >
      {children}
    </button>
  );
}
