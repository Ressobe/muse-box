import { container } from "@/di/container";
import { INotificationsRepository } from "@/src/application/repositories/notifications.repository.interface";
import { UnauthorizedError } from "@/src/entities/errors/auth";
import { NotFoundError } from "@/src/entities/errors/common";

export async function removeNotificationUseCase(
  ownerId: string,
  notificationId: string,
) {
  const notificationsRepository = container.get<INotificationsRepository>(
    "INotificationsRepository",
  );

  const notification =
    await notificationsRepository.getNotification(notificationId);
  if (!notification) {
    throw new NotFoundError("Notifiation not found");
  }

  const notifications =
    await notificationsRepository.getNotificationsForUser(ownerId);

  let isOwner = false;
  for (const n of notifications) {
    if (n.notificationId === notificationId) {
      isOwner = true;
    }
  }

  if (!isOwner) {
    throw new UnauthorizedError("User don't own this notification");
  }

  await notificationsRepository.deleteNotification(notificationId);
}
