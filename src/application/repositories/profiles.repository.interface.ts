import { Content } from "@/src/entities/models/content";
import { Profile } from "@/src/entities/models/profile";

// Todo return type
export interface IProfilesRepository {
  insertProfile(userId: string): Promise<Profile>;
  getProfileByUserId(userId: string): Promise<Profile>;
  getProfileFollowers(profileId: string): Promise<void>;
  getProfileFollowing(profileId: string): Promise<void>;
  getFavouriteContentForUser(userId: string): Promise<void>;

  updateFavourite(
    userId: string,
    entityId: string,
    type: Content,
  ): Promise<void>;

  removeFavourite(userId: string, type: Content): Promise<void>;
}
