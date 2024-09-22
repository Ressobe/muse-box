"use server";

import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";
import { removeNotificationController } from "@/src/interface-adapters/controllers/notification/remove-notification.controller";

export async function removeNotificationAction(
  ownerId: string,
  notificationId: string,
  path: string,
) {
  const authUserId = await getAuthUserIdController();
  if (!authUserId || authUserId !== ownerId) {
    return { error: "Access not authorized!" };
  }

  await removeNotificationController({ notificationId });
  return { sucess: "Removed notification" };
}
