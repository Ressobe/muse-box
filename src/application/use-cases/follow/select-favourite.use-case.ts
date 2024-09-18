import { container } from "@/di/container";
import { Content } from "@/src/entities/models/content";
import { IProfilesRepository } from "@/src/application/repositories/profiles.repository.interface";

export async function selectFavouriteUseCase(
  userId: string,
  entityId: string,
  type: Content,
) {
  const profilesRepository = container.get<IProfilesRepository>(
    "IProfilesRepository",
  );

  await profilesRepository.updateFavourite(userId, entityId, type);
}
