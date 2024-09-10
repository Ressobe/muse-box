import { container } from "@/di/container";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";
import { User } from "@/src/entities/models/user";

export async function getFilteredUsersUseCase(query: string): Promise<User[]> {
  const usersRepository = container.get<IUsersRepository>("IUsersRepository");

  const users = await usersRepository.getFilteredUsers(query.toLowerCase(), 10);

  return users;
}
