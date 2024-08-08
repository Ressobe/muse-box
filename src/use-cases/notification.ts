import {
  deleteNotification,
  isUserOwnsNotification,
  markNotificationAsReaded,
} from "@/data-access/notification";

export async function removeNotificationUseCase(
  ownerId: string,
  notificationId: string,
) {
  const notification = await isUserOwnsNotification(ownerId, notificationId);
  if (!notification) {
    throw new Error("Notification not founded!");
  }

  await deleteNotification(notificationId);
}

export async function markNotificationAsReadedUseCase(notificationId: string) {
  await markNotificationAsReaded(notificationId);
}
