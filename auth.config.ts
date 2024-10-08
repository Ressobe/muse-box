import type { NextAuthConfig } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/src/entities/models/auth";
import bcrypt from "bcryptjs";
import { db } from "./drizzle/database/db";
import { eq } from "drizzle-orm";
import { users } from "./drizzle/database/schemas";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });

          if (!user || !user.password) return null;

          const isPasswordsMatch = await bcrypt.compare(
            password,
            user.password,
          );

          if (isPasswordsMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
