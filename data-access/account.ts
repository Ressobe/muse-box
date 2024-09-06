import { db } from "@/drizzle/database/db";
import { accounts } from "@/drizzle/database/schema";
import { eq } from "drizzle-orm";

export async function getAccountByUserId(userId: string) {
  return await db.query.accounts.findFirst({
    where: eq(accounts.userId, userId),
  });
}
