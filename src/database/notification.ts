import db from "@/src/lib/db";
import { Notification, NotificationType } from "@prisma/client";
import { Result } from "../types/database";

export async function getNotifications(
  profileId: string,
): Promise<Result<Notification[], Error>> {
  try {
    const profile = await db.profile.findUnique({
      where: { id: profileId },
      include: {
        notifications: true,
      },
    });
    if (!profile) throw Error("Profile was not found");

    return [profile.notifications, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function isNewNotification(
  profileId: string,
): Promise<Result<Boolean, Error>> {
  try {
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
    if (!profile) throw Error("Profile was not found");

    if (profile.notifications.length > 0) {
      return [true, null];
    }

    return [false, null];
  } catch (error) {
    return [null, error as Error];
  }
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
): Promise<Result<Notification, Error>> {
  try {
    const [notification, notificationNotCreatedError] =
      await createNotification(resourceId, fromId, "NEW_COMMENT_FRIEND");
    if (notificationNotCreatedError) throw notificationNotCreatedError;

    const profile = await db.profile.findUnique({
      where: { id: fromId },
      include: { friendsOf: true },
    });
    if (!profile) throw Error("Profile was not found");

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
    return [notification, null];
  } catch (error) {
    return [null, error as Error];
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
