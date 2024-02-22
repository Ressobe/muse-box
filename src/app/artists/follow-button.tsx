"use client";

import { useToast } from "@/src/components/ui/use-toast";
import { followAction } from "./_actions/follow";
import { useState } from "react";
import { unfollowAction } from "./_actions/unfollow";
import { SubmitButton } from "../../components/submit-button";

type FollowButtonProps = {
  artistId: string;
  isFollowed: boolean;
  profileId?: string;
  addOptimisticFollower: () => void;
  removeOptimisticFollower: () => void;
};

export default function FollowButton({
  artistId,
  isFollowed,
  profileId,
  addOptimisticFollower,
  removeOptimisticFollower,
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
      addOptimisticFollower();
      setFollowed(true);
      await followAction(artistId, profileId);
      return;
    }

    removeOptimisticFollower();
    setFollowed(false);
    await unfollowAction(artistId, profileId);
  };

  return (
    <form action={handleSubmit}>
      <SubmitButton text={followed ? "Unfollow" : "Follow"} />
    </form>
  );
}
