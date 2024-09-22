import { container } from "@/di/container";
import { IPasswordResetTokensRepository } from "@/src/application/repositories/password-reset-tokens.repository.interface";

export async function getPasswordResetTokenByEmailUseCase(email: string) {
  const passwordResetTokensRepository =
    container.get<IPasswordResetTokensRepository>(
      "IPasswordResetTokensRepository",
    );

  return await passwordResetTokensRepository.getPasswordResetTokenByEmail(
    email,
  );
}
