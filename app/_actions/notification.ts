"use server";

import { currentUser } from "@/lib/auth";
import { removeNotificationController } from "@/src/interface-adapters/controllers/notification/remove-notification.controller";
import { revalidatePath } from "next/cache";

export async function removeNotificationAction(
  ownerId: string,
  notificationId: string,
  path: string,
) {
  const authUser = await currentUser();
  if (!authUser) {
    return { error: "Access not authorized!" };
  }

  if (authUser.id !== ownerId) {
    return { error: "Access not authorized!" };
  }

  await removeNotificationController({ ownerId, notificationId });
  // revalidatePath(path);
  return { sucess: "Removed notification" };
}
