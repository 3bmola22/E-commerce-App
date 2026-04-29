"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getRealToken() {
  const cooki = await cookies();
  // Try both cookie names for compatibility
  const myToken = 
    cooki.get("next-auth.session-token")?.value || 
    cooki.get("__Secure-next-auth.session-token")?.value;
  
  if (!myToken) {
    return null;
  }
  
  const decodedToken = await decode({
    token: myToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  const token = decodedToken?.routToken;
  return token;
}
