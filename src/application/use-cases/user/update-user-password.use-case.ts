import { container } from "@/di/container";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";

export async function updateUserPasswordUseCase(
  userId: string,
  newPassword: string,
) {
  const usersRepository = container.get<IUsersRepository>("IUsersRepository");

  await usersRepository.updateUserPassword(userId, newPassword);
}
