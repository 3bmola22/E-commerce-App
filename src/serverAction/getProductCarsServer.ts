"use server";

import { getRealToken } from "@/utilities";

export async function getCart() {
  const token = await getRealToken();

    if(!token){    throw new Error("please login");
}
const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: "GET",
      headers: { token: token },
    });
    const data = await res.json();
    return data;
}
