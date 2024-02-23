import db from "@/src/lib/db";

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
  if (profile) {
    return true;
  }
  return false;
}
