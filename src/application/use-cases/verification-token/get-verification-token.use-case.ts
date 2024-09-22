import { container } from "@/di/container";
import { IVerificationTokensRepository } from "@/src/application/repositories/verification-tokens.repository.interface";

export async function getVerificationTokenUseCase(token: string) {
  const verificationTokensRepository =
    container.get<IVerificationTokensRepository>(
      "IVerificationTokensRepository",
    );

  return await verificationTokensRepository.getVerificationTokenByToken(token);
}
