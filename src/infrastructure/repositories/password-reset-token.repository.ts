import { IPasswordResetTokensRepository } from "@/src/application/repositories/password-reset-tokens.repository.interface";
import { db } from "@/drizzle/database/db";
import { PasswordToken } from "@/src/entities/models/password-reset-token";
import { eq } from "drizzle-orm";
import { passwordResetTokens } from "@/drizzle/database/schema";

export class PasswordResetTokenRepository
  implements IPasswordResetTokensRepository
{
  async getPasswordResetTokenByToken(
    token: string,
  ): Promise<PasswordToken | undefined> {
    return await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.token, token),
    });
  }

  async getPasswordResetTokenByEmail(
    email: string,
  ): Promise<PasswordToken | undefined> {
    return await db.query.passwordResetTokens.findFirst({
      where: eq(passwordResetTokens.email, email),
    });
  }

  async deletePasswordResetToken(tokenId: string): Promise<void> {
    await db
      .delete(passwordResetTokens)
      .where(eq(passwordResetTokens.id, tokenId));
  }

  async insertPasswordResetToken(
    email: string,
    token: string,
    expires: Date,
  ): Promise<PasswordToken> {
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
}
