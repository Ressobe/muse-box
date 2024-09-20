import { container } from "@/di/container";
import { IProfilesRepository } from "@/src/application/repositories/profiles.repository.interface";

export async function createProfileUseCase(userId: string) {
  const profilesRepository = container.get<IProfilesRepository>(
    "IProfilesRepository",
  );

  const profile = await profilesRepository.insertProfile(userId);

  return profile;
}
