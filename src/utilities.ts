"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getRealToken() {
  const cooki = await cookies();
  const myToken = cooki.get("next-auth.session-token")?.value;
  const decodedToken = await decode({
    token: myToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  const token = decodedToken?.routToken;
  // console.log(cooki);
  return token
}
