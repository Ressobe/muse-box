import { container } from "@/di/container";
import { INotificationsRepository } from "@/src/application/repositories/notifications.repository.interface";

export async function getNotificationsForUserUseCase(userId: string) {
  const notificationsRepository = container.get<INotificationsRepository>(
    "INotificationsRepository",
  );

  const notifications =
    await notificationsRepository.getNotificationsForUser(userId);

  return notifications;
}
