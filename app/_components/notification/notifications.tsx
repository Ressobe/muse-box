"use client";

import useSWR from "swr";
import { isNewNotification } from "@/app/_lib/utils";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Button } from "@/app/_components/ui/button";
import { Bell, BellDot, BellOff } from "lucide-react";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { ArtistReviewNotification } from "@/app/_components/notification/artist-review-notification";
import { FollowNotification } from "@/app/_components/notification/follow-notification";
import { AlbumReviewNotification } from "@/app/_components/notification/album-review-notification";
import { TrackReviewNotification } from "@/app/_components/notification/track-review-notification";
import { Notifications as NotificationsType } from "@/src/entities/models/notification";

type NotificationListProps = {
  authUserId: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function Notifications({ authUserId }: NotificationListProps) {
  const apiUrl = `/api/notifications/${authUserId}`;
  const { data, error, isLoading, mutate } = useSWR<NotificationsType[]>(
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
            case "artist_review":
              return (
                <ArtistReviewNotification
                  key={item.id}
                  notification={item}
                  authUserId={authUserId}
                  deleteOptimistic={deleteOptimisticNotification}
                  closePopover={() => setOpen(false)}
                />
              );
            case "album_review":
              return (
                <AlbumReviewNotification
                  key={item.id}
                  notification={item}
                  authUserId={authUserId}
                  deleteOptimistic={deleteOptimisticNotification}
                  closePopover={() => setOpen(false)}
                />
              );
            case "track_review":
              return (
                <TrackReviewNotification
                  key={item.id}
                  notification={item}
                  authUserId={authUserId}
                  deleteOptimistic={deleteOptimisticNotification}
                  closePopover={() => setOpen(false)}
                />
              );
            case "follow":
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
        <Button variant="ghost" className="">
          {newNotification ? (
            <BellDot className="w-8 h-8" />
          ) : (
            <Bell className="w-8 h-8" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[18rem] md:w-[30rem] transform -translate-x-8 mt-2">
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
