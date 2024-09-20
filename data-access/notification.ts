import { db } from "@/drizzle/database/db";
import { userNotifications } from "@/drizzle/database/schemas";
import { eq } from "drizzle-orm";

export async function deleteNotification(notificationId: string) {
  await db
    .delete(userNotifications)
    .where(eq(userNotifications.id, notificationId));
}
