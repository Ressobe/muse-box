import { createFollow, deleteFollow } from "@/data-access/follow";
import {
  createNotification,
  getNotification,
  sendNotificationToUser,
} from "@/data-access/notification";
import { notificationTypes } from "@/types/notification";

export async function followUseCase(followerId: string, followingId: string) {
  const follow = await createFollow(followerId, followingId);
  if (!follow) {
    throw new Error("Follow not created!");
  }

  const notification = await getNotification(
    followerId,
    followingId,
    notificationTypes.FOLLOW,
  );

  if (!notification) {
    const notification = await createNotification(
      followerId,
      notificationTypes.FOLLOW,
      "New follower",
    );
    await sendNotificationToUser(notification.id, followingId);
  }

  return follow;
}

export async function unfollowUseCase(followerId: string, followingId: string) {
  const follow = await deleteFollow(followerId, followingId);
  if (!follow) {
    throw new Error("Follow not deleted!");
  }
  return follow;
}
