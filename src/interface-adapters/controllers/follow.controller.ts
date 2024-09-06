import { createFollowUseCase } from "@/src/application/use-cases/follow/create-follow.use-case";
import { Follow } from "@/src/entities/models/follow";

function presenter(follow: Follow) {
  return {
    followerId: follow.followerId,
    followingId: follow.followingId,
  };
}

export async function followController(
  followerId: string,
  followingId: string,
) {
  const follow = await createFollowUseCase(followerId, followingId);

  return presenter(follow);
}
