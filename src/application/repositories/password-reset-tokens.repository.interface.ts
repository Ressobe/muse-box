import { PasswordToken } from "@/src/entities/models/password-reset-token";

export interface IPasswordResetTokensRepository {
  getPasswordResetTokenByToken(
    token: string,
  ): Promise<PasswordToken | undefined>;

  getPasswordResetTokenByEmail(
    email: string,
  ): Promise<PasswordToken | undefined>;

  deletePasswordResetToken(tokenId: string): Promise<void>;

  insertPasswordResetToken(
    email: string,
    token: string,
    expires: Date,
  ): Promise<PasswordToken>;
}
