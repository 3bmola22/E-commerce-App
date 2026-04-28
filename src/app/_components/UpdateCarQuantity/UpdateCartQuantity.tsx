import { updateCartQuantity } from "@/serverAction/UpdateCartQuantity";
import React, { useContext } from "react";
import { Bounce, toast } from "react-toastify";
import { ContextCart } from "../ContextProvider/ContextUsrCart";

export default function UpdateCartQuantity({
  id,
  count,
  setallCart,
  setallProducts,
  isLoading,
}) {
      const { cartcount, setcartcount } = useContext(ContextCart);

  async function handleUpdateCartQuantity(id, newCount, sign) {
    const data = await updateCartQuantity(id, newCount);
    setallCart(data);
    setallProducts(data?.data.products);
    console.log("up", data);
    if (data?.status === "success") {
      toast.success("Product Updated successfully!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
if(sign ==="+"){
    setcartcount(cartcount+1)
}else{setcartcount(cartcount-1)}
    }
    return data;
  }
  return (
    <div className="box-border flex flex-row items-center p-1 w-[122px] h-[42px] bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
      <button
        disabled={isLoading}
        onClick={() => handleUpdateCartQuantity(id, count - 1 ,"-")}
        className="flex cursor-pointer disabled:cursor-not-allowed justify-center items-center w-8 h-8 bg-white rounded-lg shadow-sm border border-[#E5E7EB]"
      >
        <div className="w-3.5 h-[2px] bg-[#6A7282]"></div>
      </button>

      <span className="w-12 text-center text-[#101828] font-bold text-base">
        {count}
      </span>

      <button
        disabled={isLoading}
        onClick={() => handleUpdateCartQuantity(id, count + 1,"+")}
        className="flex cursor-pointer disabled:cursor-not-allowed justify-center items-center w-8 h-8 bg-[#16A34A] rounded-lg shadow-sm"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
          <path d="M11 5H7V1a1 1 0 00-2 0v4H1a1 1 0 000 2h4v4a1 1 0 002 0V7h4a1 1 0 000-2z" />
        </svg>
      </button>
    </div>
  );
}
