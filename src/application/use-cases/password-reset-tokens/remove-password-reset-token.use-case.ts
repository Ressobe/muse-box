import { container } from "@/di/container";
import { IPasswordResetTokensRepository } from "@/src/application/repositories/password-reset-tokens.repository.interface";

export async function removePasswordResetTokenUseCase(tokenId: string) {
  const passwordResetTokensRepository =
    container.get<IPasswordResetTokensRepository>(
      "IPasswordResetTokensRepository",
    );

  passwordResetTokensRepository.deletePasswordResetToken(tokenId);
}
