import { container } from "@/di/container";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";

export async function verifyUserUseCase(userId: string, email: string) {
  const usersRepository = container.get<IUsersRepository>("IUsersRepository");
  await usersRepository.verifyUser(userId, email);
}
