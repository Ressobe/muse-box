import { NotificationType } from "@prisma/client";
import NewInvite from "./new-invite";
import NewFollower from "./new-follower";

type NotificationsPopoverProps = {
  notifications: {
    id: number;
    type: NotificationType;
    resourceId: string | null;
    fromId: string;
    isRead: boolean;
    isSeen: boolean;
    createdAt: Date;
  }[];
  profileId: string;
};

export default function NotificationsPopover({
  notifications,
  profileId,
}: NotificationsPopoverProps) {
  return (
    <div>
      {notifications.map((noti) => {
        if (noti.type === "INVITE") {
          return (
            <span key={noti.id}>
              <NewInvite
                senderId={noti.fromId}
                reciverId={profileId}
                createdAt={noti.createdAt}
              />
              <div className="pb-12"></div>
            </span>
          );
        }
        if (noti.type === "NEW_FOLLOWER") {
          return (
            <span key={noti.id}>
              <NewFollower
                senderId={noti.fromId}
                reciverId={profileId}
                createdAt={noti.createdAt}
              />
              <div className="pb-6"></div>
            </span>
          );
        }
      })}
    </div>
  );
}
