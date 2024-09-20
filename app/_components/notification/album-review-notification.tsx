import { deleteNotification } from "@/data-access/notification";
import { RemoveNotificationButton } from "@/app/_components/notification/remove-notification-button";
import Link from "next/link";
import { formatTimeDiff } from "@/lib/utils";
import { UserAvatar } from "@/app/_components/user/user-avatar";
import { markNotificationAsReadedController } from "@/src/interface-adapters/controllers/notification/mark-notification-as-readed.controller";
import { AlbumReviewNotification as AlbumReviewNotificationType } from "@/src/entities/models/notification";

type AlbumReviewNotificationProps = {
  authUserId: string;
  notification: AlbumReviewNotificationType;
  deleteOptimistic: (notificationId: string) => void;
  closePopover: () => void;
};

export function AlbumReviewNotification({
  authUserId,
  notification,
  deleteOptimistic,
  closePopover,
}: AlbumReviewNotificationProps) {
  const handleClick = async () => {
    closePopover();
    await markNotificationAsReadedController(notification.id);
    setTimeout(async () => {
      await deleteNotification(notification.id);
    }, 50000);
  };

  const user = notification.albumReview.user;

  return (
    <div className="mx-1">
      <Link
        href={`/profiles/${notification.albumReview.userId}`}
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
            {user.name} rated {notification.albumReview.album.title}
            <span className="">
              {" "}
              {notification.albumReview.rating}{" "}
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
