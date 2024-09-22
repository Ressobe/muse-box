import { container } from "@/di/container";
import { INotificationsRepository } from "@/src/application/repositories/notifications.repository.interface";

export async function markNotificationAsReadedUseCase(notificationId: string) {
  const notificationsRepository = container.get<INotificationsRepository>(
    "INotificationsRepository",
  );

  await notificationsRepository.markNotificationAsReaded(notificationId);
}
