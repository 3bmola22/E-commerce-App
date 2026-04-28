"use server";

import { getRealToken } from "@/utilities";
import { Bounce, toast } from "react-toastify";

export async function deleteCart() {

  const token = await getRealToken();

  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      headers: { token: token },
      method: "DELETE",
    });
    const data = await res.json();
    // console.log("trrrr",data)
    // if(data.message ==="success"){data.   setcartcount}
    return data;
  } catch (error) {
    return undefined;
  }
}
