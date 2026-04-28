"use server";

import { getRealToken } from "@/utilities";
import { jwtDecode } from "jwt-decode";

export async function getAllOrders() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/`);
  if (!res.ok) throw new Error("Failed to fetch orders");

  const data = await res.json();
  // console.log("orderr", data); // شوف الـ dataExact

  return data; // بدل `return res`
}
export async function getUserOrders() {
   const token = await getRealToken();
        const {id} = jwtDecode(token);
        // console.log("tokk", id);
        // console.log("tokk", id);
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
  );
  if (!res.ok) throw new Error("Failed to fetch orders");

  const data = await res.json();
  // console.log("orderr", token.user); // شوف الـ dataExact
  // console.log("orderr", token.user); // شوف الـ dataExact

  return data; // بدل `return res`
}
