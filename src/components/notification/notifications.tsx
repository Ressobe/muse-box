import { currentUser } from "@/lib/auth";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { getUserNotificationsUseCase } from "@/use-cases/user";
import { NotificationList } from "./notifications-list";

export async function Notifications() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const notifications = await getUserNotificationsUseCase(user.id);
  if (!notifications) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative">
          <Bell className="w-8 h-8" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 absolute -right-8">
        <NotificationList notifications={notifications} authUserId={user.id} />
      </PopoverContent>
    </Popover>
  );
}
