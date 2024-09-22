import { container } from "@/di/container";
import { INotificationsRepository } from "@/src/application/repositories/notifications.repository.interface";
import { NotFoundError } from "@/src/entities/errors/common";

export async function removeNotificationUseCase(notificationId: string) {
  const notificationsRepository = container.get<INotificationsRepository>(
    "INotificationsRepository",
  );

  const notification =
    await notificationsRepository.getNotification(notificationId);
  if (!notification) {
    throw new NotFoundError("Notifiation not found");
  }

  await notificationsRepository.deleteNotification(notificationId);
}
