import { getUserById } from "@/data-access/user";
import type { ArtistReviewNotification } from "@/types/notification";
import { getArtistUseCase } from "@/use-cases/artist";
import Link from "next/link";
import { UserAvatar } from "@/components/user-avatar";
import { formatTimeDiff } from "@/lib/utils";

type ArtistReviewNotificationProps = {
  notification: ArtistReviewNotification;
};

export async function ArtistReviewNotification({
  notification,
}: ArtistReviewNotificationProps) {
  const { artistReview } = notification;

  const artist = await getArtistUseCase(artistReview.entityId);
  const user = await getUserById(notification.senderId);

  return (
    <div>
      <Link className="flex" href={`/artists/${artist?.id}`}>
        <UserAvatar avatarUrl={user?.image} />
        <div className="flex flex-col">
          <span>{user?.name}</span>
          <span>
            {user?.name} reviewed {artist?.name} with{" "}
            {artistReview.rating > 1
              ? `stars ★ ${artistReview.rating}`
              : `star ★ ${artistReview.rating}`}
          </span>
          <span className="text-sm text-muted-foreground">
            {notification.createdAt && formatTimeDiff(notification.createdAt)}
          </span>
        </div>
      </Link>
    </div>
  );
}
