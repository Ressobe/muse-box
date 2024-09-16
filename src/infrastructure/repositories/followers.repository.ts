import { IFollowersRepository } from "@/src/application/repositories/followers.repository.interface";
import { db } from "@/drizzle/database/db";
import { follows, userProfiles, users } from "@/drizzle/database/schemas";
import { and, countDistinct, eq } from "drizzle-orm";
import {
  AmountOfFollowersAndFollowing,
  FollowerUser,
  FollowingUser,
} from "@/src/entities/models/follow";
import { alias } from "drizzle-orm/sqlite-core";

export class FollowersRepository implements IFollowersRepository {
  async insertFollow(followerId: string, followingId: string) {
    const [follow] = await db
      .insert(follows)
      .values({
        followerId,
        followingId,
      })
      .returning();
    return follow;
  }

  async deleteFollow(followerId: string, followingId: string) {
    const [follow] = await db
      .delete(follows)
      .where(
        and(
          eq(follows.followerId, followerId),
          eq(follows.followingId, followingId),
        ),
      )
      .returning();
    return follow;
  }

  async getFollow(followerId: string, followingId: string) {
    return await db.query.follows.findFirst({
      where: and(
        eq(follows.followerId, followerId),
        eq(follows.followingId, followingId),
      ),
    });
  }

  async getFollowersForProfile(profileId: string): Promise<FollowerUser[]> {
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

  async getFollowingForProfile(profileId: string): Promise<FollowingUser[]> {
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

  async getAmountOfFollowersAndFollowingForUser(
    userId: string,
  ): Promise<AmountOfFollowersAndFollowing> {
    const followersTable = alias(follows, "followers");
    const followingTable = alias(follows, "following");

    const [info] = await db
      .select({
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
    return info;
  }
}
