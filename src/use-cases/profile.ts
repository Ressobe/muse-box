import { getProfileByUserId } from "@/data-access/profile";

export async function getProfileUseCase(userId: string) {
  const profile = await getProfileByUserId(userId);
  if (!profile) {
    throw "Profile not found";
  }
  return profile;
}
