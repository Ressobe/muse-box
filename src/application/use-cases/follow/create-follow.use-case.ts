import { container } from "@/di/container";
import { IFollowersRepository } from "@/src/application/repositories/followers.repository.interface";
import { Follow } from "@/src/entities/models/follow";

export async function createFollowUseCase(
  followerId: string,
  followingId: string,
): Promise<Follow> {
  const followersRepository = container.get<IFollowersRepository>(
    "IFollowersRepository",
  );

  const newFollow = followersRepository.insertFollow(followerId, followingId);

  return newFollow;
}
