"use server";

import { getRealToken } from "@/utilities";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { json } from "zod";

export async function addProductCartServer(productId: string) {
  const token = await getRealToken();
  
  if (!token) {
    return { status: "fail", message: "Please login first" };
  }
  
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v2/cart`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: { 
        "Content-Type": "application/json", 
        token: token as string 
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { status: "error", message: String(err) };
  }
}
