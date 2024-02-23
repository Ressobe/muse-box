"use client";
import { NotificationType } from "@prisma/client";

type NotificationsPopoverProps = {
  notifications: {
    id: number;
    type: NotificationType;
    resourceId: string;
    isReaded: boolean;
  }[];
};

export default function NotificationsPopover({
  notifications,
}: NotificationsPopoverProps) {
  return (
    <div>
      {notifications.map((noti) => {
        return (
          <span>
            {noti.type}
            {noti.resourceId}
          </span>
        );
      })}
    </div>
  );
}

function NewFollower({ resourceId }: { rescourceId: string }) {
  return (
    <>
      <span>{resourceId}</span>
      <span>started following you</span>
      <span>follow button if user don't follow</span>
    </>
  );
}

function NewFriendInvite({ rescourceId }: { resourceId: string }) {
  return (
    <>
      <span>{rescourceId}</span>
      <span>a new friend request</span>
    </>
  );
}

function AcceptedFriendInvite({ rescourceId }: { resourceId: string }) {
  return (
    <>
      <span>{rescourceId}</span>
      <span>your friend request was accepted</span>
    </>
  );
}

function NewAlbum() {}
