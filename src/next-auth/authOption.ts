import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
export const authOtion: NextAuthOptions = {
  providers: [
    Credentials({
      name: "btnName",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "••••••••",
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "content-type": "application/json" },
            },
          );
          const data = await res.json();
          const message = await data.message;
          if (!res.ok) {
            throw new Error(message);
          }
          const jwt: { id: string } = jwtDecode(data.token);
          // console.log("jwtt", jwt);
          return {
            id: jwt.id,
            name: data.user.name,
            email: data.user.email,
            accessToken: data.token,
          };
        } catch (err) {
          throw new Error((err as Error).message);
        }
      },
    }),
  ],
  callbacks: {
    jwt(param) {
      if (param.user) {
        param.token.routToken = param.user.accessToken;
        param.token.id = param.user.id;
        // console.log("jwtParam", param);
        // console.log("jwtParam", param);
      }
      return param.token;
    },
    session({ token, session }) {
      // when route to host//api/auth/session

      session.id = token.id;
      // console.log("sessionParam", session);
      // console.log("sessionParam", session);
      return session;
    },
  },
  pages: { signIn: "/login" },
  cookies: {
    sessionToken: {
      name:
        process.env.NODE_ENV === "production"
          ? "__Secure-next-auth.session-token"
          : "next-auth.session-token",
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
  },
};
