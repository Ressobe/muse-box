import { container } from "@/di/container";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";

export async function getUserUseCase(userId: string) {
  const usersRepository = container.get<IUsersRepository>("IUsersRepository");

  const user = usersRepository.getUserById(userId);

  return user;
}
