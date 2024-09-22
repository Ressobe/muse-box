import { container } from "@/di/container";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";

export async function getUserByNameUseCase(name: string) {
  const usersRepository = container.get<IUsersRepository>("IUsersRepository");

  return await usersRepository.getUserByName(name);
}
