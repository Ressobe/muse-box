import { container } from "@/di/container";
import { Content } from "@/src/entities/models/content";
import { IProfilesRepository } from "@/src/application/repositories/profiles.repository.interface";

export async function removeFavouriteUseCase(userId: string, type: Content) {
  const profilesRepository = container.get<IProfilesRepository>(
    "IProfilesRepository",
  );

  await profilesRepository.removeFavourite(userId, type);
}
