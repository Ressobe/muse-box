"use client";

import { SubmitButton } from "@/src/components/submit-button";
import { useToast } from "@/src/components/ui/use-toast";
import { UserMinus, UserPlus } from "lucide-react";
import removeFriendAction from "./_actions/remove-friend";
import inviteToFriendAction from "./_actions/invite-friend";

type InviteToFriendProps = {
  senderId?: string;
  reciverId: string;
  isFriend: boolean;
  isInvitedAlready: boolean;
};

export default function InviteToFriend({
  senderId,
  reciverId,
  isFriend,
  isInvitedAlready,
}: InviteToFriendProps) {
  if (senderId === reciverId) {
    return null;
  }

  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!senderId) {
      toast({
        variant: "destructive",
        title: "Unable to add",
        description:
          "If you'd like to add friend, please log in to your account first.",
      });
      return;
    }
    if (isFriend) {
      await removeFriendAction(senderId, reciverId);
      return;
    }
    if (!isInvitedAlready) {
      await inviteToFriendAction(senderId, reciverId);
      toast({
        variant: "default",
        title: "Sended frined request",
      });
    }
  };

  return (
    <form action={handleSubmit}>
      <SubmitButton className="flex gap-x-2" disabled={isInvitedAlready}>
        {isFriend ? (
          <>
            <UserMinus />
            Remove friend
          </>
        ) : (
          <>
            <UserPlus />
            <>
              {isInvitedAlready ? (
                <span>Invited</span>
              ) : (
                <span>Add friend</span>
              )}
            </>
          </>
        )}
      </SubmitButton>
    </form>
  );
}
