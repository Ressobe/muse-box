"use server";

import { currentUser } from "@/lib/auth";
import { removeNotificationUseCase } from "@/use-cases/notification";
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

  await removeNotificationUseCase(ownerId, notificationId);
  // revalidatePath(path);
  return { sucess: "Removed notification" };
}
