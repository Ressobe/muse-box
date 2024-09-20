import { IProfilesRepository } from "@/src/application/repositories/profiles.repository.interface";
import { db } from "@/drizzle/database/db";
import { follows, userProfiles, users } from "@/drizzle/database/schemas";
import { Profile, ProfileWithRelations } from "@/src/entities/models/profile";
import { countDistinct, eq } from "drizzle-orm";
import { Content } from "@/src/entities/models/content";
import { alias } from "drizzle-orm/sqlite-core";

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
        break;
      case "album":
        await db
          .update(userProfiles)
          .set({
            favoriteAlbumId: entityId,
          })
          .where(eq(userProfiles.userId, userId));
        break;
      case "track":
        await db
          .update(userProfiles)
          .set({
            favoriteTrackId: entityId,
          })
          .where(eq(userProfiles.userId, userId));
        break;

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
        break;
      case "album":
        await db
          .update(userProfiles)
          .set({
            favoriteAlbumId: null,
          })
          .where(eq(userProfiles.userId, userId));
        break;
      case "track":
        await db
          .update(userProfiles)
          .set({
            favoriteTrackId: null,
          })
          .where(eq(userProfiles.userId, userId));
        break;
      default:
        throw new Error(`Unknown item type: ${type}`);
    }
  }

  async getProfileWithRelations(
    profileId: string,
  ): Promise<ProfileWithRelations | undefined> {
    const followersTable = alias(follows, "followers");
    const followingTable = alias(follows, "following");

    const [profile] = await db
      .select({
        userId: userProfiles.userId,
        favouriteArtistId: userProfiles.favoriteArtistId,
        favouriteAlbumId: userProfiles.favoriteAlbumId,
        favouriteTrackId: userProfiles.favoriteTrackId,
        user: {
          id: users.id,
          image: users.image,
          name: users.name,
        },
        amountOfFollowers: countDistinct(followersTable.followerId).as(
          "amountOfFollowers",
        ),
        amountOfFollowing: countDistinct(followingTable.followingId).as(
          "amountOfFollowing",
        ),
      })
      .from(userProfiles)
      .where(eq(userProfiles.userId, profileId))
      .innerJoin(users, eq(userProfiles.userId, users.id))
      .leftJoin(
        followersTable,
        eq(userProfiles.userId, followersTable.followingId),
      )
      .leftJoin(
        followingTable,
        eq(userProfiles.userId, followingTable.followerId),
      )
      .groupBy(userProfiles.userId, users.id);

    return profile;
  }
}
