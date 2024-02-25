"use client";

import { SubmitButton } from "../submit-button";
import { useToast } from "../ui/use-toast";
import rejectToFriendAction from "./action/reject-to-friend";

type RejectToFriendButtonProps = {
  profileWhoRejectId: string;
  profileWhoIsBeingRejectedId: string;
  profileName?: string;
};

export default function RejectToFriendButton({
  profileWhoRejectId,
  profileWhoIsBeingRejectedId,
  profileName,
}: RejectToFriendButtonProps) {
  const { toast } = useToast();

  const handleSubmit = async () => {
    await rejectToFriendAction(profileWhoRejectId, profileWhoIsBeingRejectedId);
    toast({
      variant: "default",
      title: "Rejected friend request",
      description: `You rejected ${profileName}`,
    });
  };
  return (
    <form action={handleSubmit}>
      <SubmitButton>Reject</SubmitButton>
    </form>
  );
}
