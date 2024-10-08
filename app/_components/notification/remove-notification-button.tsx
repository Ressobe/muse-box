"use client";

import { XIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { removeNotificationAction } from "@/app/_actions/notification";
import { usePathname } from "next/navigation";

type RemoveNotificationButtonProps = {
  ownerId: string;
  notificationId: string;
  removeNotificationOptimistic: (notificationId: string) => void;
};

export function RemoveNotificationButton({
  ownerId,
  notificationId,
  removeNotificationOptimistic,
}: RemoveNotificationButtonProps) {
  const pathname = usePathname();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removeNotificationOptimistic(notificationId);
    await removeNotificationAction(ownerId, notificationId, pathname);
  };

  return (
    <Button
      variant="none"
      className="absolute top-0 right-0 px-2 py-1 transition-all active:scale-125"
      onClick={handleClick}
    >
      <XIcon className="w-4 h-4 text-white" />
    </Button>
  );
}
