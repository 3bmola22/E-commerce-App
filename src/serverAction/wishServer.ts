"use server";

import { getRealToken } from "@/utilities";

export async function wishProduct(productId: string) {
  const token = await getRealToken();
  
  if (!token) {
    return { status: "fail", message: "Please login first" };
  }
  
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
      method: "POST",
      body: JSON.stringify({ productId }),
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (err) {
    return { status: "error", message: String(err) };
  }
}

export async function getWish() {
  const token = await getRealToken();

  if (!token) {
    throw new Error("please login");
  }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    method: "GET",
    headers: { token: token },
  });
  const data = await res.json();
  return data;
}
export async function deleteProductWish({id}:{id:string}) {
  const token = await getRealToken();

  if (!token) {
    throw new Error("please login");
  }
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {
      method: "DELETE",
      headers: { token: token },
    },
  );
  const data = await res.json();
  
  return data;
}
