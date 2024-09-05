import { db } from "@/database/db";
import { accounts } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function getAccountByUserId(userId: string) {
  return await db.query.accounts.findFirst({
    where: eq(accounts.userId, userId),
  });
}
