import { deleteNotification } from "@/data-access/notification";
import type { TrackReviewNotification } from "@/types/notification";
import { markNotificationAsReadedUseCase } from "@/use-cases/notification";
import { RemoveNotificationButton } from "@/components/notification/remove-notification-button";
import Link from "next/link";
import { formatTimeDiff } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";

type TrackReviewNotificationProps = {
  authUserId: string;
  notification: TrackReviewNotification;
  deleteOptimistic: (notificationId: string) => void;
  closePopover: () => void;
};

export function TrackReviewNotification({
  authUserId,
  notification,
  deleteOptimistic,
  closePopover,
}: TrackReviewNotificationProps) {
  const handleClick = async () => {
    closePopover();
    await markNotificationAsReadedUseCase(notification.id);
    setTimeout(async () => {
      await deleteNotification(notification.id);
    }, 50000);
  };

  const user = notification.trackReview.user;

  return (
    <div className="mx-1">
      <Link
        href={`/profiles/${notification.trackReview.userId}`}
        className="relative flex items-center p-4 gap-4 rounded transition-colors hover:bg-secondary/40"
        onClick={handleClick}
      >
        {!notification.isRead && (
          <div className="absolute top-1/2 left-1 w-1 h-1 bg-blue-500 rounded-full"></div>
        )}

        <UserAvatar avatarUrl={user?.image} />
        <div className="flex flex-col">
          <span>{user.name}</span>
          <span>
            {user.name} rated {notification.trackReview.track.title}
            <span>
              {" "}
              {notification.trackReview.rating}{" "}
              <span className="text-yellow-500 text-xl">★</span>
            </span>
          </span>
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
