"use client";

import { useToast } from "@/src/components/ui/use-toast";
import { followAction } from "./_actions/follow";
import { useState } from "react";
import { unfollowAction } from "./_actions/unfollow";
import { SubmitButton } from "./submit-button";

type FollowButtonProps = {
  artistId: string;
  isFollowed: boolean;
  profileId?: string;
};

export default function FollowButton({
  artistId,
  isFollowed,
  profileId,
}: FollowButtonProps) {
  const { toast } = useToast();
  const [followed, setFollowed] = useState(isFollowed);

  const handleSubmit = async () => {
    if (!profileId) {
      toast({
        variant: "destructive",
        title: "Unable to follow",
        description:
          "If you'd like to follow, please log in to your account first.",
      });
      return;
    }

    if (!followed) {
      setFollowed(true);
      await followAction(artistId, profileId);
      return;
    }

    setFollowed(false);
    await unfollowAction(artistId, profileId);
  };

  return (
    <form action={handleSubmit}>
      <SubmitButton text={followed ? "Unfollow" : "Follow"} />
    </form>
  );
}
