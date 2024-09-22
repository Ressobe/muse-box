import { markNotificationAsReadedUseCase } from "@/src/application/use-cases/notification/mark-notification-as-readed.use-case";
import { InputParseError } from "@/src/entities/errors/common";

export async function markNotificationAsReadedController(
  notificationId: string | undefined,
) {
  if (!notificationId) {
    throw new InputParseError(
      "Invalid input in markNotificationAsReadedController",
    );
  }

  await markNotificationAsReadedUseCase(notificationId);
}
