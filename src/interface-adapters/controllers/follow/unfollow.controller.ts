import { unfollowUseCase } from "@/src/application/use-cases/follow/unfollow.use-case";

export async function unfollowController(
  followerId: string,
  followingId: string,
) {
  await unfollowUseCase(followerId, followingId);
}
