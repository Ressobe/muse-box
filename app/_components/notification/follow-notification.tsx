"use client";

import { UserAvatar } from "@/app/_components/user/user-avatar";
import Link from "next/link";
import { formatTimeDiff } from "@/lib/utils";
import { RemoveNotificationButton } from "./remove-notification-button";
import { deleteNotification } from "@/data-access/notification";
import { markNotificationAsReadedController } from "@/src/interface-adapters/controllers/notification/mark-notification-as-readed.controller";
import { FollowNotification as FollowNotificationType } from "@/src/entities/models/notification";

type FollowNotificationProps = {
  authUserId: string;
  notification: FollowNotificationType;
  deleteOptimistic: (notificationId: string) => void;
  closePopover: () => void;
};

export function FollowNotification({
  authUserId,
  notification,
  deleteOptimistic,
  closePopover,
}: FollowNotificationProps) {
  const { sender } = notification;

  const handleClick = async () => {
    closePopover();
    await markNotificationAsReadedController(notification.id);
    setTimeout(async () => {
      await deleteNotification(notification.id);
    }, 50000);
  };

  return (
    <div className="mx-1">
      <Link
        href={`/profiles/${sender.id}`}
        className="relative flex items-center p-4 gap-4 rounded transition-colors hover:bg-secondary/40"
        onClick={handleClick}
      >
        {!notification.isRead && (
          <div className="absolute top-1/2 left-1 w-1 h-1 bg-blue-500 rounded-full"></div>
        )}

        <UserAvatar avatarUrl={sender.image} />
        <div className="flex flex-col">
          <span>{sender.name}</span>
          <span>{sender.name} is now following you</span>
          <span className="text-sm text-muted-foreground">
            {notification.createdAt && formatTimeDiff(notification.createdAt)}
          </span>
        </div>
        <RemoveNotificationButton
          removeNotificationOptimistic={() => deleteOptimistic(notification.id)}
          ownerId={authUserId}
          notificationId={notification.id}
        />
      </Link>
    </div>
  );
}
