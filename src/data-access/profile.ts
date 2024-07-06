import { db } from "@/database/db";
import { userProfiles } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function createProfile(userId: string) {
  return await db
    .insert(userProfiles)
    .values({
      userId,
    })
    .returning();
}

export async function getProfileByUserId(userId: string) {
  return await db.query.userProfiles.findFirst({
    where: eq(userProfiles.userId, userId),
  });
}
