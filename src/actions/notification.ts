"use server";

import { currentUser } from "@/lib/auth";
import { removeNotficationUseCase } from "@/use-cases/notification";

export async function removeNotificationAction(
  ownerId: string,
  notificationId: string,
) {
  const authUser = await currentUser();
  if (!authUser) {
    return { error: "Access not authorized!" };
  }

  if (authUser.id !== ownerId) {
    return { error: "Access not authorized!" };
  }

  await removeNotficationUseCase(ownerId, notificationId);
}
