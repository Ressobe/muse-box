import { FollowerUser } from "@/src/entities/models/follow";
import {
  Notification,
  NotificationRecipientsWithNotification,
  NotificationType,
} from "@/src/entities/models/notification";

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

  sendNotificationToFollowers(
    notificationId: string,
    followers: FollowerUser[],
  ): Promise<void>;

  getNotificationsForUser(
    userId: string,
  ): Promise<NotificationRecipientsWithNotification[]>;
}
