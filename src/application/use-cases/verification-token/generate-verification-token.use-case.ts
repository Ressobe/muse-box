import { container } from "@/di/container";
import { v4 as uuidv4 } from "uuid";
import { IVerificationTokensRepository } from "@/src/application/repositories/verification-tokens.repository.interface";

export async function generateVerificationTokenUseCase(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const verificationTokensRepository =
    container.get<IVerificationTokensRepository>(
      "IVerificationTokensRepository",
    );

  const existingToken =
    await verificationTokensRepository.getVerificationTokenByEmail(email);

  if (existingToken) {
    await verificationTokensRepository.deleteVerificationToken(
      existingToken.id,
    );
  }

  const newToken = await verificationTokensRepository.insertVerificationToken(
    email,
    token,
    expires,
  );

  if (newToken) return { email, token, expires };

  return null;
}
