import {
  Notification,
  NotificationType,
} from "@/src/entities/models/notification";

export interface INotificationsRepository {
  deleteNotification(notificationId: string): Promise<Notification>;
  markNotificationAsReaded(notificationId: string): Promise<void>;

  insertNotification(
    creatorId: string,
    resourceId: string,
    type: NotificationType,
    message: string,
  ): Promise<Notification>;

  findNotification(
    creatorId: string,
    reciverId: string,
    type: NotificationType,
  ): Promise<Notification>;

  sendNotificationToUser(
    notificationId: string,
    reciverId: string,
  ): Promise<void>;

  sendNotificationToFollowers(
    notificationId: string,
    senderId: string,
  ): Promise<void>;
}
