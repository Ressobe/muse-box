import { container } from "@/di/container";
import { IProfilesRepository } from "@/src/application/repositories/profiles.repository.interface";
import { ProfileWithRelations } from "@/src/entities/models/profile";

export async function getProfileUseCase(
  profileId: string,
): Promise<ProfileWithRelations | undefined> {
  const profilesRepository = container.get<IProfilesRepository>(
    "IProfilesRepository",
  );

  const profile = await profilesRepository.getProfileWithRelations(profileId);

  return profile;
}
