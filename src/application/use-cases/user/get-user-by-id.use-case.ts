import { container } from "@/di/container";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";

export async function getUserByIdUseCase(userId: string) {
  const usersRepository = container.get<IUsersRepository>("IUsersRepository");

  return await usersRepository.getUserById(userId);
}
