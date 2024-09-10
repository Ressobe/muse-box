import { Follow } from "@/src/entities/models/follow";
import {
  Notification,
  NotificationRecipientsWithNotification,
  NotificationType,
} from "@/src/entities/models/notification";

// TODO: Return types

export interface INotificationsRepository {
  deleteNotification(notificationId: string): Promise<void>;
  markNotificationAsReaded(notificationId: string): Promise<void>;

  insertNotification(
    creatorId: string,
    resourceId: string,
    type: NotificationType,
    message: string,
  ): Promise<Notification>;

  sendNotificationToUser(
    notificationId: string,
    reciverId: string,
  ): Promise<void>;

  // Muszę w use case dla danego użytkownika zdobyć listę jego
  // followersow
  sendNotificationToFollowers(
    notificationId: string,
    followers: Follow[],
  ): Promise<void>;

  getNotificationsForUser(
    userId: string,
  ): Promise<NotificationRecipientsWithNotification[]>;
}
