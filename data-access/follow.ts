import { db } from "@/drizzle/database/db";
import { follows } from "@/drizzle/database/schemas";
import { and, eq } from "drizzle-orm";

export async function getFollow(followerId: string, followingId: string) {
  return await db.query.follows.findFirst({
    where: and(
      eq(follows.followerId, followerId),
      eq(follows.followingId, followingId),
    ),
  });
}
