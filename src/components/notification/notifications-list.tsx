"use client";

import {
  NotificationT,
  notificationTypes,
  OptimisticActionNotification,
} from "@/types/notification";
import { ArtistReviewNotification } from "./artist-review-notification";
import { FollowNotification } from "./follow-notification";
import { useOptimistic } from "react";

type NotificationListProps = {
  notifications: NotificationT[];
  authUserId: string;
};

export function NotificationList({
  notifications,
  authUserId,
}: NotificationListProps) {
  const [optimisticNotifications, setOptimisticNotifications] = useOptimistic<
    NotificationT[],
    OptimisticActionNotification
  >(notifications, (state, action) => {
    switch (action.type) {
      case "add":
        return [action.notification, ...state];
      case "delete":
        return state.filter((item) => item.id !== action.notificationId);
      default:
        return state;
    }
  });

  const deleteOptimisticNotification = (notificationId: string) => {
    setOptimisticNotifications({ type: "delete", notificationId });
  };

  return (
    <ul className="flex flex-col gap-4">
      {optimisticNotifications.map((item) => {
        switch (item.type) {
          case notificationTypes.ARTIST_REVIEW:
            return (
              <ArtistReviewNotification key={item.id} notification={item} />
            );
          case notificationTypes.ALBUM_REVIEW:
            return (
              <li key={item.id}>Album Review: {item.albumReview.rating} </li>
            );
          case notificationTypes.TRACK_REVIEW:
            return (
              <li key={item.id}>Track Review: {item.trackReview.rating}</li>
            );
          case notificationTypes.FOLLOW:
            return (
              <FollowNotification
                key={item.id}
                notification={item}
                authUserId={authUserId}
                deleteOptimistic={deleteOptimisticNotification}
              />
            );
        }
      })}
    </ul>
  );
}
