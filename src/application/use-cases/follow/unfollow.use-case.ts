import { container } from "@/di/container";
import { IFollowersRepository } from "@/src/application/repositories/followers.repository.interface";

export async function unfollowUseCase(followerId: string, followingId: string) {
  const followersRepository = container.get<IFollowersRepository>(
    "IFollowersRepository",
  );

  await followersRepository.deleteFollow(followerId, followingId);
}
