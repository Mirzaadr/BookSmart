import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./prisma";
import { getUserById } from "./data/user";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  ...authConfig,
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (!token.sub) return token;

      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
});
