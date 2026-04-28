"use server";

import { CheckoutType } from "@/schema/registerSchema";
import { getRealToken } from "@/utilities";
import { getToken } from "next-auth/jwt";
import { json } from "zod";

export async function onlinePayment(
  id: string,
  url: string = process.env.NEXTAUTH_URL!,
  formvalue: CheckoutType,
) {
  const token = await getRealToken();
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${url}`,
    {
      method: "POST",
      headers: { token: token, "content-type": "application/json" },
      body: JSON.stringify({ shippingAddress: formvalue }),
    },
  );
  const data = res.json();
  return data;
}
