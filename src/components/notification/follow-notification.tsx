import type { FollowNotification } from "@/types/notification";
import { UserAvatar } from "../user-avatar";
import Link from "next/link";
import { formatTimeDiff } from "@/lib/utils";

type FollowNotificationProps = {
  notification: FollowNotification;
};

export function FollowNotification({ notification }: FollowNotificationProps) {
  const { sender } = notification;

  return (
    <div>
      <Link
        href={`/profiles/${sender.id}`}
        className="flex items-center p-2 gap-4 rounded transition-colors hover:bg-secondary/40"
      >
        <UserAvatar avatarUrl={sender.image} />
        <div className="flex flex-col">
          <span>{sender.name}</span>
          <span>{sender.name} is now following you</span>
          <span className="text-sm text-muted-foreground">
            {notification.createdAt && formatTimeDiff(notification.createdAt)}
          </span>
        </div>
      </Link>
    </div>
  );
}
