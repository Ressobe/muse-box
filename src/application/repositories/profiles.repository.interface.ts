import { Profile } from "@/src/entities/models/profile";

// Todo return type
export interface IProfilesRepository {
  insertProfile(userId: string): Promise<Profile>;
  getProfileByUserId(userId: string): Promise<Profile>;
  getProfileFollowers(profileId: string): Promise<void>;
  getProfileFollowing(profileId: string): Promise<void>;
}
