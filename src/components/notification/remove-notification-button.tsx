"use client";

import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeNotificationAction } from "@/actions/notification";

type RemoveNotificationButtonProps = {
  ownerId: string;
  notificationId: string;
  removeNotificationOptimistic: () => void;
};

export function RemoveNotificationButton({
  ownerId,
  notificationId,
  removeNotificationOptimistic,
}: RemoveNotificationButtonProps) {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    removeNotificationOptimistic();
    await removeNotificationAction(ownerId, notificationId);
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
