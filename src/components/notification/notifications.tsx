"use client";

import useSWR from "swr";
import { isNewNotification } from "@/lib/utils";
import { useState } from "react";
import { NotificationT, notificationTypes } from "@/types/notification";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Bell, BellDot, BellOff } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArtistReviewNotification } from "@/components/notification/artist-review-notification";
import { FollowNotification } from "@/components/notification/follow-notification";

type NotificationListProps = {
  authUserId: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Notifications({ authUserId }: NotificationListProps) {
  const apiUrl = `/api/notifications/${authUserId}`;
  const { data, error, isLoading, mutate } = useSWR<NotificationT[]>(
    apiUrl,
    fetcher,
  );
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return (
      <Button disabled variant="ghost" className="relative">
        <Bell className="w-8 h-8" />
      </Button>
    );
  }

  if (error) {
    return <div>error: {error}</div>;
  }

  if (!data) {
    return null;
  }

  const newNotification = isNewNotification(data);

  const deleteOptimisticNotification = async (notificationId: string) => {
    mutate(
      data.filter((item) => item.id !== notificationId),
      {
        rollbackOnError: true,
        populateCache: true,
        revalidate: false,
      },
    );
  };

  const renderNotifications = () => {
    return (
      <ul className="flex flex-col gap-4">
        {data.map((item) => {
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
        {data.length > 0 ? (
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
