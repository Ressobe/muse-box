"use client";

import { useState } from "react";
import { SubmitButton } from "../submit-button";
import unfollowAction from "@/src/app/profile/[profileId]/_actions/unfollow-profile";
import followAction from "@/src/app/profile/[profileId]/_actions/follow-profile";

type FollowButtonProps = {
  senderId: string;
  reciverId: string;
  isFollowing: boolean;
};

export default function FollowButton({
  senderId,
  reciverId,
  isFollowing,
}: FollowButtonProps) {
  const [followed, setFollowed] = useState(isFollowing);

  const handleSubmit = async () => {
    if (followed) {
      await unfollowAction(reciverId, senderId);
      setFollowed(false);
      return;
    }
    await followAction(reciverId, senderId);
    setFollowed(true);
  };

  return (
    <form action={handleSubmit} className="ml-auto">
      <SubmitButton>{followed ? "Unfollow" : "Follow"}</SubmitButton>
    </form>
  );
}
