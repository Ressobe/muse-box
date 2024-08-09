import { currentUser } from "@/lib/auth";
import { getUserNotificationsUseCase } from "@/use-cases/user";
import { NotificationList } from "./notifications-list";
import { isNewNotification } from "@/lib/utils";

export async function Notifications() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const notifications = await getUserNotificationsUseCase(user.id);
  if (!notifications) {
    return null;
  }

  const newNotification = isNewNotification(notifications);

  return (
    <NotificationList
      notifications={notifications.concat(notifications).concat(notifications)}
      newNotification={newNotification}
      authUserId={user.id}
    />
  );
}
