"use server";

import { getRealToken } from "@/utilities";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { json } from "zod";

export async function addProductCartServer(productId: string) {
  const token = await getRealToken();
  // console.log("decodedToken", token);
  // if (!token) {
  //   throw new Error("login First");
  // }
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: { "Content-Type": "application/json", token: token as string },
    });
    const data = await res.json();
// console.log("yyyyyyyyy", data);
    return data;
  } catch (err) {
    return err;
  }
}
