import { container } from "@/di/container";
import { IUsersRepository } from "@/src/application/repositories/users.repository.interface";

export async function updateUserImageUseCase(userId: string, newImage: string) {
  const usersRepository = container.get<IUsersRepository>("IUsersRepository");
  return await usersRepository.updateUserImage(userId, newImage);
}
