"use client";
import React from "react";
import { SessionProvider, useSession, signOut } from "next-auth/react";

export function useAuthStatus() {
  const session = useSession();
  return session;
}

// دالة تسجيل الخروج المحسنة
export function handleSignOut() {
  signOut({
    callbackUrl: "/login",
    redirect: true,
  });
}

// الـ Provider الرئيسي
export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider
      refetchInterval={5 * 60} // تحديث الجلسة كل 5 دقائق
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}
  