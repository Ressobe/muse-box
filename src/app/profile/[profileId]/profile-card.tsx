"use client";

import { useOptimistic } from "react";
import FollowButton from "./follow-button";

type ProfileCardProps = {
  amountOfFollowers?: number;
  profileId: string;
  profileSessionId?: string;
  isFollowed: boolean;
};

export default function ProfileCard({
  amountOfFollowers,
  profileId,
  profileSessionId,
  isFollowed,
}: ProfileCardProps) {
  const [optimisiticFollowers, addOptimisticFollowers] = useOptimistic(
    amountOfFollowers || 0,
    (state, f) => state + Number(f)
  );
  return (
    <>
      <span>Followers: {optimisiticFollowers}</span>
      <FollowButton
        profileId={profileId}
        profileSessionId={profileSessionId}
        isFollowed={isFollowed}
        addOptimisticFollower={() => addOptimisticFollowers(1)}
        removeOptimisticFollower={() => addOptimisticFollowers(-1)}
      />
    </>
  );
}
