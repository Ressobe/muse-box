import { container } from "@/di/container";
import { IVerificationTokensRepository } from "@/src/application/repositories/verification-tokens.repository.interface";

export async function removeVerificationTokenUseCase(tokenId: string) {
  const verificationTokensRepository =
    container.get<IVerificationTokensRepository>(
      "IVerificationTokensRepository",
    );

  await verificationTokensRepository.deleteVerificationToken(tokenId);
}
