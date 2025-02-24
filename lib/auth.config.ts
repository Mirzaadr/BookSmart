import { NextAuthConfig, User } from "next-auth";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./prisma";

export default {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: { email: credentials.email.toString() },
        });

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password.toString(),
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName,
        } as User;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
} satisfies NextAuthConfig;
