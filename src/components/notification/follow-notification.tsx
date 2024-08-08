import type { FollowNotification } from "@/types/notification";
import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { formatTimeDiff } from "@/lib/utils";
import { RemoveNotificationButton } from "./remove-notification-button";

type FollowNotificationProps = {
  authUserId: string;
  notification: FollowNotification;
  deleteOptimistic: (notificationId: string) => void;
};

export function FollowNotification({
  authUserId,
  notification,
  deleteOptimistic,
}: FollowNotificationProps) {
  const { sender } = notification;

  return (
    <div>
      <Link
        href={`/profiles/${sender.id}`}
        className="relative flex items-center p-2 gap-4 rounded transition-colors hover:bg-secondary/40"
      >
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
