"use server";

import { markAllSeenNotifications } from "@/src/database/notification";

export default async function markNewNotificationsAsSeenAction(
  profileId: string,
) {
  await markAllSeenNotifications(profileId);
}
