import { getProfileFollowersUseCase } from "@/src/application/use-cases/profile/get-profile-followers.use-case";
import { getProfileFollowingUseCase } from "@/src/application/use-cases/profile/get-profile-following.use-case";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import { getProfileUseCase } from "@/use-cases/profile";

export async function getProfileInfoController(profileId: string | undefined) {
  if (!profileId) {
    throw new InputParseError("Profile id not provided");
  }

  const profile = await getProfileUseCase(profileId);
  if (!profile) {
    throw new NotFoundError("Profile not founded");
  }

  const profileFollowers = await getProfileFollowersUseCase(profileId);
  const profileFollowing = await getProfileFollowingUseCase(profileId);
}
