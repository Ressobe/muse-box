"use client";

import { SubmitButton } from "@/src/components/submit-button";
import { useToast } from "@/src/components/ui/use-toast";
import { useState } from "react";
import followAction from "./_actions/follow-profile";
import unfollowAction from "./_actions/unfollow-profile";
import { BookmarkMinusIcon, BookmarkPlusIcon } from "lucide-react";

type FollowButtonProps = {
  profileId: string;
  profileSessionId?: string;
  isFollowed: boolean;
  addOptimisticFollower: () => void;
  removeOptimisticFollower: () => void;
};
export default function FollowButton({
  profileId,
  profileSessionId,
  isFollowed,
  addOptimisticFollower,
  removeOptimisticFollower,
}: FollowButtonProps) {
  if (profileId === profileSessionId) {
    return null;
  }

  const { toast } = useToast();
  const [followed, setFollowed] = useState(isFollowed);

  const handleSubmit = async () => {
    if (!profileSessionId) {
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
      await followAction(profileSessionId, profileId);
      return;
    }
    removeOptimisticFollower();
    setFollowed(false);
    await unfollowAction(profileSessionId, profileId);
  };

  return (
    <form action={handleSubmit}>
      <SubmitButton className="flex gap-x-2">
        {followed ? (
          <>
            <BookmarkMinusIcon />
            <span>Unfollow</span>
          </>
        ) : (
          <>
            <BookmarkPlusIcon />
            <span>Follow</span>
          </>
        )}
      </SubmitButton>
    </form>
  );
}
