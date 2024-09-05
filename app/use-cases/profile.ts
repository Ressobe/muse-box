import {
  getProfileByUserId,
  getProfileFollowers,
  getProfileFollowing,
} from "@/data-access/profile";

export async function getProfileUseCase(userId: string) {
  const profile = await getProfileByUserId(userId);
  if (!profile) {
    throw "Profile not found";
  }
  return profile;
}

export async function getProfileFollowingUseCase(profileId: string) {
  const users = await getProfileFollowing(profileId);
  return users.map((item) => ({
    ...item.followingUser,
  }));
}

export async function getProfileFollowersUseCase(profileId: string) {
  const users = await getProfileFollowers(profileId);
  return users.map((item) => ({
    ...item.followerUser,
  }));
}
