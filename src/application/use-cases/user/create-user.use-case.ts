import { container } from "@/di/container";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";

export async function createUserUseCase(
  email: string,
  name: string,
  password: string,
) {
  const usersRepository = container.get<IUsersRepository>("IUsersRepository");

  const user = await usersRepository.insertUser(email, name, password);

  return user;
}
