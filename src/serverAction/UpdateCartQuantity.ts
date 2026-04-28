"use server";
import { getRealToken } from "@/utilities";

export async function updateCartQuantity(id, count) {
  const token = await getRealToken();

  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v2/cart/${id}`,
      {
        method: "PUT",
        headers: { token: token, "content-type": "application/json" },
        body: JSON.stringify({ count: count }),
      },
    );
    const data =await res.json()
    return data
  } catch (error) {
    return undefined;
  }
}
