"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";

export function useAuthStatus() {
    
  const authStatu = useSession();
  return authStatu;
  // console.log("authStatu", authStatu);
}
export function singnOutt() {
  signOut({ callbackUrl: "/login" });
}
export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
