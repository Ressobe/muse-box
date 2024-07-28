import { currentUser } from "@/lib/auth";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { getUserNotificationsUseCase } from "@/use-cases/user";
import { notificationTypes } from "@/types/notification";

export async function Notifications() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const notifications = await getUserNotificationsUseCase(user.id);
  if (!notifications) {
    return null;
  }

  const renderContent = () => {
    return (
      <ul className="flex flex-col">
        {notifications.map((item) => {
          switch (item.type) {
            case notificationTypes.ARTIST_REVIEW:
              return (
                <li key={item.id}>Artist Review: {item.artistReview.rating}</li>
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
              return <li key={item.id}>New follower! {item.resourceId}</li>;
          }
        })}
      </ul>
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <Bell className="w-8 h-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">{renderContent()}</PopoverContent>
    </Popover>
  );
}
