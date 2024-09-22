import { container } from "@/di/container";
import { IPasswordResetTokensRepository } from "@/src/application/repositories/password-reset-tokens.repository.interface";

export async function getPasswordResetTokenUseCase(token: string) {
  const passwordResetTokensRepository =
    container.get<IPasswordResetTokensRepository>(
      "IPasswordResetTokensRepository",
    );

  const existingToken =
    await passwordResetTokensRepository.getPasswordResetTokenByToken(token);

  return existingToken;
}
