import { container } from "@/di/container";
import { IPasswordResetTokensRepository } from "@/src/application/repositories/password-reset-tokens.repository.interface";

export async function createPasswordResetTokenUseCase(
  email: string,
  token: string,
  expires: Date,
) {
  const passwordResetTokensRepository =
    container.get<IPasswordResetTokensRepository>(
      "IPasswordResetTokensRepository",
    );

  const newToken = await passwordResetTokensRepository.insertPasswordResetToken(
    email,
    token,
    expires,
  );

  return newToken;
}
