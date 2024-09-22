import { container } from "@/di/container";
import { IVerificationTokensRepository } from "@/src/application/repositories/verification-tokens.repository.interface";

export async function createVerificationTokenUseCase(
  email: string,
  token: string,
  expires: Date,
) {
  const verificationTokensRepository =
    container.get<IVerificationTokensRepository>(
      "IVerificationTokensRepository",
    );

  const newToken = await verificationTokensRepository.insertVerificationToken(
    email,
    token,
    expires,
  );

  return newToken;
}
