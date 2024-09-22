import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { unfollowUseCase } from "@/src/application/use-cases/follow/unfollow.use-case";

export async function unfollowController(
  followerId: string,
  followingId: string,
) {
  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  await authenticationService.validateSession();

  await unfollowUseCase(followerId, followingId);
}
