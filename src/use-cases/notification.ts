import {
  deleteNotification,
  isUserOwnsNotification,
} from "@/data-access/notification";

export async function removeNotficationUseCase(
  ownerId: string,
  notificationId: string,
) {
  const notification = await isUserOwnsNotification(ownerId, notificationId);
  if (!notification) {
    throw new Error("Notification not founded!");
  }

  await deleteNotification(notificationId);
}
