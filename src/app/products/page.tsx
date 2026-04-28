import { getRealToken } from "@/utilities";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

export default function cart() {
  async function getUserCart() {
    const token = await getRealToken();

    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
        method: "GET",
        headers: { token: token },
      });
      const data = await res.json();
      // console.log("lalala", data);
    } catch (error) {
      return undefined;
    }
  }
  getUserCart();
  return (
    <div className="max-w-7xl mx-auto p-2 bg-amber-200">
      <div className="flex gap-2  ">
        <div className="inner flex flex-col gap-y-3 p-2">
          <img
            className="p-2 w-full h-full border-2 border-slate-400 rounded-2xl"
            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
            alt="Avatar Tailwind CSS Component"
          />
          <p className="bg-green-700 text-white rounded-2xl flex items-center self-end px-2">
            <GoDotFill /> In Stock
          </p>
        </div>

        <div className="inner2 bg-green-200">
          <h2>productName</h2>
          <div className="flex gap-x-2">
            <p className="bg-green-200 text-green-700 px-2 rounded-2xl">
              category
            </p>
            <p className="text-slate-500">SKO:ProductCode</p>
          </div>
          <div className="flex gap-x-2">
            <p className="text-green-700 text-2xl">price</p>
            <p className="text-slate-300">Per unit</p>
          </div>
          <div className="flex justify-between inner4">
            <div className="join border border-gray-200 bg-gray-50 rounded-2xl overflow-hidden w-[122px] h-10 items-center px-3 justify-between">
              <button className="join-item btn btn-square bg-white border-0 shadow-sm w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                −
              </button>

              <div className="join-item flex items-center justify-center w-12 font-bold text-lg text-gray-900 bg-transparent">
                2
              </div>

              <button className="join-item btn btn-square bg-green-600 border-0 shadow-sm text-white w-8 h-8 flex items-center justify-center hover:bg-green-700">
                +
              </button>
            </div>
            <div className="inner flex bg-amber-300">
              <div className="flex">
                <p>price</p>
                <div className="div">
                  <p>Total</p>
                  <p>EGP</p>
                </div>
              </div>
              <button className="block cursor-pointer bg-red-200 w-12 h-12  rounded-2xl text-red-700">
                <FaTrashAlt className=" m-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
