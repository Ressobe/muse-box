import { INotificationsRepository } from "@/src/application/repositories/notifications.repository.interface";
import { db } from "@/drizzle/database/db";
import {
  Notification,
  NotificationRecipientsWithNotification,
  NotificationType,
} from "@/src/entities/models/notification";
import {
  notificationRecipients,
  userNotifications,
} from "@/drizzle/database/schemas";
import { eq } from "drizzle-orm";
import { Follow, FollowerUser } from "@/src/entities/models/follow";

export class NotificationsRepository implements INotificationsRepository {
  async deleteNotification(notificationId: string): Promise<void> {
    await db
      .delete(userNotifications)
      .where(eq(userNotifications.id, notificationId));
  }

  async markNotificationAsReaded(notificationId: string): Promise<void> {
    await db
      .update(notificationRecipients)
      .set({
        isRead: true,
      })
      .where(eq(notificationRecipients.notificationId, notificationId));
  }

  async insertNotification(
    creatorId: string,
    resourceId: string,
    type: NotificationType,
    message: string,
  ): Promise<Notification> {
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

  async sendNotificationToUser(
    notificationId: string,
    reciverId: string,
  ): Promise<void> {
    await db.insert(notificationRecipients).values({
      notificationId,
      ownerId: reciverId,
    });
  }

  async sendNotificationToFollowers(
    notificationId: string,
    followers: FollowerUser[],
  ): Promise<void> {
    if (followers.length === 0) return;

    for (const item of followers) {
      await db.insert(notificationRecipients).values({
        notificationId,
        ownerId: item.followerUser.id,
      });
    }
  }

  async getNotificationsForUser(
    userId: string,
  ): Promise<NotificationRecipientsWithNotification[]> {
    return await db.query.notificationRecipients.findMany({
      where: eq(notificationRecipients.ownerId, userId),
      with: {
        notification: true,
      },
    });
  }
}
