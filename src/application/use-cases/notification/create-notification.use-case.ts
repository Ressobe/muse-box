import { container } from "@/di/container";
import { INotificationsRepository } from "@/src/application/repositories/notifications.repository.interface";
import { NotificationType } from "@/src/entities/models/notification";

export async function createNotificationUseCase(
  creatorId: string,
  resourceId: string,
  type: NotificationType,
  message: string,
) {
  const notificationsRepository = container.get<INotificationsRepository>(
    "INotificationsRepository",
  );

  const notification = await notificationsRepository.insertNotification(
    creatorId,
    resourceId,
    type,
    message,
  );

  return notification;
}
