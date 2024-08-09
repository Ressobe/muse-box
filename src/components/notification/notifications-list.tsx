"use client";

import {
  NotificationT,
  notificationTypes,
  OptimisticActionNotification,
} from "@/types/notification";
import { ArtistReviewNotification } from "./artist-review-notification";
import { FollowNotification } from "./follow-notification";
import { useOptimistic, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Bell, BellDot, BellOff } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

type NotificationListProps = {
  notifications: NotificationT[];
  authUserId: string;
  newNotification: boolean;
};

export function NotificationList({
  notifications,
  authUserId,
  newNotification,
}: NotificationListProps) {
  const [open, setOpen] = useState(false);
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

  const renderNotifications = () => {
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
                  closePopover={() => setOpen(false)}
                />
              );
          }
        })}
      </ul>
    );
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          {newNotification ? (
            <BellDot className="w-8 h-8" />
          ) : (
            <Bell className="w-8 h-8" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 absolute -right-8">
        {notifications.length > 0 ? (
          <ScrollArea className="h-96 p-2">
            <>{renderNotifications()}</>
          </ScrollArea>
        ) : (
          <div className="h-full flex flex-col items-center gap-4">
            <BellOff className="w-12 h-12" />
            <span>No notifications</span>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
