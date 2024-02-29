import db from "@/src/lib/db";
import { NotificationType } from "@prisma/client";

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

export async function createNewCommentNotification(
  resourceId: string,
  fromId: string,
) {
  const notification = await db.notification.create({
    data: {
      type: "INVITE",
      resourceId: resourceId,
      fromId: fromId,
    },
  });
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
