import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    role?: string; // اختياري إذا كان موجوداً في الـ JWT
    image?: string; // اختياري
    createdAt?: Date | string; // اختياري
    updatedAt?: Date | string; //
  }
}
declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string;
      role?: string;
    };
    id: string;
    expires: string;
  }
  interface User {
    id: string;
    name: string;
    email: string;
    accessToken: string;
    role?: string; // اختياري إذا كان موجوداً في الـ JWT
    image?: string; // اختياري
    createdAt?: Date | string; // اختياري
    updatedAt?: Date | string; //
  }
}
