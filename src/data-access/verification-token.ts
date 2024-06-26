import { db } from "@/database/db";
import { verificationTokens } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function getVerificationTokenByEmail(email: string) {
  return db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.email, email),
  });
}

export async function getVerificationTokenByToken(token: string) {
  return db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });
}

export async function removeVerificationTokenById(tokenId: string) {
  await db.delete(verificationTokens).where(eq(verificationTokens.id, tokenId));
}

export async function insertVerificationToken(
  email: string,
  token: string,
  expires: Date,
) {
  const [verificationToken] = await db
    .insert(verificationTokens)
    .values({
      email,
      token,
      expires,
    })
    .returning();
  return verificationToken;
}
