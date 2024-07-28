import { db } from "@/database/db";
import { userNotifications } from "@/database/schema";
import { NotificationType } from "@/types/notification";
import { and, eq } from "drizzle-orm";

export async function createNotification(
  creatorId: string,
  reciverId: string,
  type: NotificationType,
  message: string,
) {
  return await db
    .insert(userNotifications)
    .values({
      ownerId: reciverId,
      resourceId: creatorId,
      senderId: creatorId,
      message: message,
      type: type,
    })
    .returning();
}

export async function getNotification(
  creatorId: string,
  reciverId: string,
  type: NotificationType,
) {
  return db.query.userNotifications.findFirst({
    where: and(
      eq(userNotifications.ownerId, reciverId),
      eq(userNotifications.resourceId, creatorId),
      eq(userNotifications.type, type),
    ),
  });
}
