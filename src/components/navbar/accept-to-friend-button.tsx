"use client";

import { SubmitButton } from "../submit-button";
import { useToast } from "../ui/use-toast";
import acceptToFriendAction from "./action/accept-to-friend";

type AcceptToFriendButtonProps = {
  profileWhoAcceptId: string;
  profileWhoIsBeingAcceptedId: string;
  profileName?: string;
};

export default function AcceptToFriendButton({
  profileWhoAcceptId,
  profileWhoIsBeingAcceptedId,
  profileName,
}: AcceptToFriendButtonProps) {
  const { toast } = useToast();

  const handleSubmit = async () => {
    await acceptToFriendAction(profileWhoAcceptId, profileWhoIsBeingAcceptedId);
    toast({
      variant: "default",
      title: "Accepeted friend request",
      description: `Now you are friend with ${profileName}`,
    });
  };

  return (
    <form action={handleSubmit}>
      <SubmitButton>Accept</SubmitButton>
    </form>
  );
}
