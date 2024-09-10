import { container } from "@/di/container";
import { IProfilesRepository } from "@/src/application/repositories/profiles.repository.interface";

export async function getProfileUseCase(profileId: string) {
  const profilesRepository = container.get<IProfilesRepository>(
    "IProfilesRepository",
  );

  const profile = await profilesRepository.getProfile(profileId);

  return profile;
}
