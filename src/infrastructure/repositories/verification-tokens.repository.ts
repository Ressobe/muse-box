import { IVerificationTokensRepository } from "@/src/application/repositories/verification-tokens.repository.interface";
import { VerificationToken } from "@/src/entities/models/verification-token";
import { db } from "@/drizzle/database/db";
import { eq } from "drizzle-orm";
import { verificationTokens } from "@/drizzle/database/schema";

export class VerificationTokensRepository
  implements IVerificationTokensRepository
{
  async getVerificationTokenByEmail(
    email: string,
  ): Promise<VerificationToken | undefined> {
    return db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.email, email),
    });
  }

  async getVerificationTokenByToken(
    token: string,
  ): Promise<VerificationToken | undefined> {
    return db.query.verificationTokens.findFirst({
      where: eq(verificationTokens.token, token),
    });
  }

  async deleteVerificationToken(tokenId: string): Promise<void> {
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.id, tokenId));
  }

  async insertVerificationToken(
    email: string,
    token: string,
    expires: Date,
  ): Promise<VerificationToken> {
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
}
