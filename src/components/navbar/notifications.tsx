import { Bell, BellDotIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import NotificationsPopover from "./notifications-popover";
import { isNewNotification } from "@/src/database/notification";
import getServerProfileSession from "@/src/lib/session";
import { notFound } from "next/navigation";
import markNewNotificationsAsSeenAction from "./action/mark-new-notifications-as-seen";

export default async function Notifications() {
  const profile = await getServerProfileSession();

  if (!profile) {
    notFound();
  }

  const notifications = profile.notifications;
  const isNew = await isNewNotification(profile.id);

  const handleSubmit = async () => {
    "use server";
    if (isNew) {
      await markNewNotificationsAsSeenAction(profile.id);
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <form action={handleSubmit}>
            <button>
              {isNew && notifications.length > 0 ? <BellDotIcon /> : <Bell />}
            </button>
          </form>
        </PopoverTrigger>
        <PopoverContent className="w-[500px] shadow-lg absolute -right-6 mt-1">
          <NotificationsPopover
            notifications={notifications}
            profileId={profile.id}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}
