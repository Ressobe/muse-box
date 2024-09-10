import { VerificationToken } from "@/src/entities/models/verification-token";

export interface IVerificationTokensRepository {
  getVerificationTokenByEmail(
    email: string,
  ): Promise<VerificationToken | undefined>;

  getVerificationTokenByToken(
    token: string,
  ): Promise<VerificationToken | undefined>;

  deleteVerificationToken(tokenId: string): Promise<void>;

  insertVerificationToken(
    email: string,
    token: string,
    expires: Date,
  ): Promise<VerificationToken>;
}
