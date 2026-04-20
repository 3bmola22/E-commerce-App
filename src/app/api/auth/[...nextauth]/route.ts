import { authOtion } from "@/next-auth/authOption";
import NextAuth from "next-auth"

const handler = NextAuth(authOtion  );

export { handler as GET, handler as POST }