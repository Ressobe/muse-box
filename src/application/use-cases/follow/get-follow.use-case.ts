import { container } from "@/di/container";
import { IFollowersRepository } from "@/src/application/repositories/followers.repository.interface";

export async function getFollowUseCase(
  followerId: string,
  followingId: string,
) {
  const followersRepository = container.get<IFollowersRepository>(
    "IFollowersRepository",
  );

  const follow = followersRepository.getFollow(followerId, followingId);

  return follow;
}
