import { container } from "@/di/container";
import { IFollowersRepository } from "@/src/application/repositories/followers.repository.interface";

export async function getProfileFollowersUseCase(profileId: string) {
  const followersRepository = container.get<IFollowersRepository>(
    "IFollowersRepository",
  );

  const followers = await followersRepository.getFollowersForProfile(profileId);

  return followers;
}
