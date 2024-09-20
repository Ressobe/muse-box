import { Content } from "@/src/entities/models/content";
import { Profile, ProfileWithRelations } from "@/src/entities/models/profile";

export interface IProfilesRepository {
  insertProfile(userId: string): Promise<Profile>;
  getProfile(profileId: string): Promise<Profile | undefined>;

  getProfileWithRelations(
    profileId: string,
  ): Promise<ProfileWithRelations | undefined>;

  updateFavourite(
    userId: string,
    entityId: string,
    type: Content,
  ): Promise<void>;

  removeFavourite(userId: string, type: Content): Promise<void>;
}
