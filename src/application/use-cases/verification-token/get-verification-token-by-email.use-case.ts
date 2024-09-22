import { container } from "@/di/container";
import { IVerificationTokensRepository } from "@/src/application/repositories/verification-tokens.repository.interface";

export async function getVerificationTokenByEmailUseCase(email: string) {
  const verificationTokensRepository =
    container.get<IVerificationTokensRepository>(
      "IVerificationTokensRepository",
    );

  return await verificationTokensRepository.getVerificationTokenByEmail(email);
}
