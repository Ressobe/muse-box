import { db } from "@/drizzle/database/db";
import { passwordResetTokens } from "@/drizzle/database/schemas";
import { eq } from "drizzle-orm";

export async function getPasswordResetTokenByEmail(email: string) {
  return await db.query.passwordResetTokens.findFirst({
    where: eq(passwordResetTokens.email, email),
  });
}

export async function removePasswordResetTokenById(tokenId: string) {
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.id, tokenId));
}

export async function createPasswordResetToken(
  email: string,
  token: string,
  expires: Date,
) {
  const [passwordToken] = await db
    .insert(passwordResetTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();
  return passwordToken;
}
