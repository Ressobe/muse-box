import { db } from "@/database/db";
import { follows, userProfiles, users } from "@/database/schema";
import { count, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";

export async function createProfile(userId: string) {
  return await db
    .insert(userProfiles)
    .values({
      userId,
    })
    .returning();
}

export async function getProfileByUserId(userId: string) {
  const followersTable = alias(follows, "followers");
  const followingTable = alias(follows, "following");

  const [profile] = await db
    .select({
      userId: userProfiles.userId,
      favouriteArtistId: userProfiles.favoriteArtistId,
      favouriteAlbumId: userProfiles.favoriteAlbumId,
      favouriteTrackId: userProfiles.favoriteTrackId,
      user: users,
      amountOfFollowers: count(followersTable.followerId).as(
        "amountOfFollowers",
      ),
      amountOfFollowing: count(followingTable.followingId).as(
        "amountOfFollowing",
      ),
    })
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
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

export async function getProfileFollowers(profileId: string) {
  return await db.query.follows.findMany({
    columns: {
      followerId: false,
      followingId: false,
    },
    where: eq(follows.followingId, profileId),
    with: {
      followerUser: true,
    },
  });
}

export async function getProfileFollowing(profileId: string) {
  return await db.query.follows.findMany({
    columns: {
      followerId: false,
      followingId: false,
    },
    where: eq(follows.followerId, profileId),
    with: {
      followingUser: true,
    },
  });
}
