import { db } from "@/drizzle/database/db";
import {
  follows,
  notificationRecipients,
  userNotifications,
} from "@/drizzle/database/schemas";
import { NotificationType } from "@/types/notification";
import { and, eq } from "drizzle-orm";

export async function createNotification(
  creatorId: string,
  resourceId: string,
  type: NotificationType,
  message: string,
) {
  const [notification] = await db
    .insert(userNotifications)
    .values({
      resourceId: resourceId,
      senderId: creatorId,
      message: message,
      type: type,
    })
    .returning();
  return notification;
}

export async function isUserOwnsNotification(
  ownerId: string,
  notificationId: string,
) {
  const [notification] = await db
    .select()
    .from(userNotifications)
    .innerJoin(notificationRecipients, eq(userNotifications.id, notificationId))
    .where(eq(notificationRecipients.ownerId, ownerId));

  return notification;
}

export async function deleteNotification(notificationId: string) {
  await db
    .delete(userNotifications)
    .where(eq(userNotifications.id, notificationId));
}

export async function getNotification(
  creatorId: string,
  reciverId: string,
  type: NotificationType,
) {
  const notification = await db
    .select({
      notificationId: userNotifications.id,
      senderId: userNotifications.senderId,
      type: userNotifications.type,
      resourceId: userNotifications.resourceId,
      message: userNotifications.message,
      createdAt: userNotifications.createdAt,
      isRead: notificationRecipients.isRead,
    })
    .from(userNotifications)
    .innerJoin(
      notificationRecipients,
      eq(userNotifications.id, notificationRecipients.notificationId),
    )
    .where(
      and(
        eq(userNotifications.senderId, creatorId),
        eq(userNotifications.type, type),
        eq(notificationRecipients.ownerId, reciverId),
      ),
    )
    .limit(1);

  return notification.length > 0 ? notification[0] : null;
}

export async function sendNotificationToUser(
  notificationId: string,
  reciverId: string,
) {
  await db.insert(notificationRecipients).values({
    notificationId,
    ownerId: reciverId,
  });
}

export async function sendNotificationToFollowers(
  notificationId: string,
  senderId: string,
) {
  const followers = await db.query.follows.findMany({
    where: eq(follows.followingId, senderId),
  });

  if (followers.length === 0) return;

  for (const item of followers) {
    await db.insert(notificationRecipients).values({
      notificationId,
      ownerId: item.followerId,
    });
  }
}

export async function markNotificationAsReaded(notificationId: string) {
  await db
    .update(notificationRecipients)
    .set({
      isRead: true,
    })
    .where(eq(notificationRecipients.notificationId, notificationId));
}
