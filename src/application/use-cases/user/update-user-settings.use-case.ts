import { container } from "@/di/container";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { Settings } from "@/src/entities/models/settings";

export async function updateUserSettingsUseCase(
  userId: string,
  values: Settings,
) {
  const usersRepository = container.get<IUsersRepository>("IUsersRepository");

  await usersRepository.updateUser(userId, values);
}
