import { container } from "@/di/container";
import { IFollowersRepository } from "@/src/application/repositories/followers.repository.interface";

export async function getProfileFollowingUseCase(profileId: string) {
  const followersRepository = container.get<IFollowersRepository>(
    "IFollowersRepository",
  );

  const following = await followersRepository.getFollowingForProfile(profileId);

  return following;
}
