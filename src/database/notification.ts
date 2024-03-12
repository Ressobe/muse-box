import db from "@/src/lib/db";
import { Notification, NotificationType } from "@prisma/client";
import { Result } from "../types/database";

export async function getNotifications(profileId: string) {
  const profile = await db.profile.findUnique({
    where: { id: profileId },
    include: {
      notifications: true,
    },
  });
  return profile?.notifications;
}

export async function isNewNotification(profileId: string) {
  const profile = await db.profile.findUnique({
    where: { id: profileId },
    include: {
      notifications: {
        where: {
          isSeen: false,
        },
      },
    },
  });

  if (!profile) {
    return false;
  }
  if (profile.notifications.length > 0) {
    return true;
  }

  return false;
}

export async function markAllSeenNotifications(profileId: string) {
  await db.profile.update({
    where: { id: profileId },
    data: {
      notifications: {
        updateMany: {
          where: { isSeen: false },
          data: { isSeen: true },
        },
      },
    },
  });
}

export async function createNotification(
  resourceId: string,
  fromId: string,
  type: NotificationType,
): Promise<Result<Notification, Error>> {
  try {
    const notification = await db.notification.create({
      data: {
        resourceId,
        fromId,
        type,
      },
    });
    return [notification, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function createNewCommentNotification(
  resourceId: string,
  fromId: string,
) {
  const [notification, notificationNotCreatedError] = await createNotification(
    resourceId,
    fromId,
    "NEW_COMMENT_FRIEND",
  );
  if (notificationNotCreatedError) throw notificationNotCreatedError;

  const profile = await db.profile.findUnique({
    where: { id: fromId },
    include: { friendsOf: true },
  });

  if (!profile || !profile.friendsOf) {
    return null;
  }

  for (const friend of profile.friendsOf) {
    await db.profile.update({
      where: { id: friend.id },
      data: {
        notifications: {
          connect: {
            id: notification.id,
          },
        },
      },
    });
  }
}

export async function deleteNotification(notificationId: number) {
  try {
    const notification = await db.notification.delete({
      where: { id: notificationId },
    });
    return [notification, null];
  } catch (error) {
    return [null, error as Error];
  }
}
