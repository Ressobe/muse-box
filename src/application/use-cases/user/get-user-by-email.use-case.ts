import { container } from "@/di/container";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";

export async function getUserByEmailUseCase(email: string) {
  const usersRepository = container.get<IUsersRepository>("IUsersRepository");

  return await usersRepository.getUserByEmail(email);
}
