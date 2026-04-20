"use server";
import { LoginData, RegisterData } from "@/schema/registerSchema";
import { cookies } from "next/headers";

export async function sendRegisterData(inputsData: RegisterData) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(inputsData),
        headers: { "content-type": "application/json" },
      },
    );
    const data = await res.json();
    const message = await data.message;
    return res.ok;
  } catch (error) {
    return undefined;
  }
}
export async function sendLoginData(inputsData: LoginData) {
  
}
