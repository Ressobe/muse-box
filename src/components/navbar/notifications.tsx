import { Bell, BellDotIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { getProfile } from "../../database/profile";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import NotificationsPopover from "./notifications-popover";

export default async function Notifications() {
  const session = await getServerSession(authOptions);
  const profile = await getProfile(session?.user.userid);
  if (!profile) {
    return null;
  }

  const notifications = profile.notifications;

  return (
    <>
      <Popover>
        <PopoverTrigger>
          {notifications.length > 0 ? <BellDotIcon /> : <Bell />}
        </PopoverTrigger>
        <PopoverContent className="mt-2">
          <NotificationsPopover notifications={notifications} />
        </PopoverContent>
      </Popover>
    </>
  );
}
