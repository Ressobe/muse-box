import { db } from "@/drizzle/database/db";
import { follows, userProfiles, users } from "@/drizzle/database/schema";
import { countDistinct, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/sqlite-core";

// inserProfile
export async function createProfile(userId: string) {
  const [profile] = await db
    .insert(userProfiles)
    .values({
      userId,
    })
    .returning();
  return profile;
}

// Muszę tych dwóch użyć w usecase
// getProfile
// getAmountOfFollowersAndFollowingForUser(userId: string)

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
      amountOfFollowers: countDistinct(followersTable.followerId).as(
        "amountOfFollowers",
      ),
      amountOfFollowing: countDistinct(followingTable.followingId).as(
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

// getFollowersForProfile
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

// getFollowingForProfile
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
