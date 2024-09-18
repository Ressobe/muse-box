import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle/database/db";
import { getUserById } from "./data-access/user";
import { eq } from "drizzle-orm";
import { getAccountByUserId } from "./data-access/account";
import authConfig from "@/auth.config";
import { users } from "./drizzle/database/schemas";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({
          emailVerified: new Date(),
        })
        .where(eq(users.id, user.id ?? ""));
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      if (!user.id) return false;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.OAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      const account = await getAccountByUserId(existingUser.id);

      token.OAuth = !!account;
      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
