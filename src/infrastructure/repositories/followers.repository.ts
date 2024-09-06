import { IFollowersRepository } from "@/src/application/repositories/followers.repository.interface";
import { db } from "@/drizzle/database/db";
import { follows } from "@/drizzle/database/schema";
import { and, eq } from "drizzle-orm";

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
}
