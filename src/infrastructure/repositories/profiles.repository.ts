import { IProfilesRepository } from "@/src/application/repositories/profiles.repository.interface";
import { db } from "@/drizzle/database/db";
import { userProfiles } from "@/drizzle/database/schema";
import { Profile } from "@/src/entities/models/profile";
import { eq } from "drizzle-orm";
import { Content } from "@/src/entities/models/content";

export class ProfilesRepository implements IProfilesRepository {
  async insertProfile(userId: string): Promise<Profile> {
    const [profile] = await db
      .insert(userProfiles)
      .values({
        userId,
      })
      .returning();
    return profile;
  }

  async getProfile(profileId: string): Promise<Profile | undefined> {
    return await db.query.userProfiles.findFirst({
      where: eq(userProfiles.userId, profileId),
    });
  }

  async updateFavourite(
    userId: string,
    entityId: string,
    type: Content,
  ): Promise<void> {
    switch (type) {
      case "artist":
        await db
          .update(userProfiles)
          .set({
            favoriteArtistId: entityId,
          })
          .where(eq(userProfiles.userId, userId));
      case "album":
        await db
          .update(userProfiles)
          .set({
            favoriteAlbumId: entityId,
          })
          .where(eq(userProfiles.userId, userId));
      case "track":
        await db
          .update(userProfiles)
          .set({
            favoriteTrackId: entityId,
          })
          .where(eq(userProfiles.userId, userId));

      default:
        throw new Error(`Unknown item type: ${type}`);
    }
  }

  async removeFavourite(userId: string, type: Content): Promise<void> {
    switch (type) {
      case "artist":
        await db
          .update(userProfiles)
          .set({
            favoriteArtistId: null,
          })
          .where(eq(userProfiles.userId, userId));
      case "album":
        await db
          .update(userProfiles)
          .set({
            favoriteAlbumId: null,
          })
          .where(eq(userProfiles.userId, userId));
      case "track":
        await db
          .update(userProfiles)
          .set({
            favoriteTrackId: null,
          })
          .where(eq(userProfiles.userId, userId));
      default:
        throw new Error(`Unknown item type: ${type}`);
    }
  }
}
