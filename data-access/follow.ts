import { db } from "@/drizzle/database/db";
import { follows } from "@/drizzle/database/schema";
import { and, eq } from "drizzle-orm";

export async function createFollow(followerId: string, followingId: string) {
  const [follow] = await db
    .insert(follows)
    .values({
      followerId,
      followingId,
    })
    .returning();
  return follow;
}

export async function deleteFollow(followerId: string, followingId: string) {
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

export async function getFollow(followerId: string, followingId: string) {
  return await db.query.follows.findFirst({
    where: and(
      eq(follows.followerId, followerId),
      eq(follows.followingId, followingId),
    ),
  });
}
