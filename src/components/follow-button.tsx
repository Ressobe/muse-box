"use client";

import { CircleCheck } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import { followAction, unfollowAction } from "@/actions/follow";

type FollowButtonProps = {
  defaultFollowState: boolean;
  followerId: string;
  followingId: string;
  size?: "lg" | "md";
};

export function FollowButton({
  defaultFollowState,
  followerId,
  followingId,
}: FollowButtonProps) {
  const { toast } = useToast();
  const [follow, setFollow] = useState(defaultFollowState);

  const handleClick = async () => {
    if (!follow) {
      setFollow(true);
      toast({
        description: (
          <div className="flex items-center">
            <CircleCheck className="mr-2 text-green-500" />
            Added to your follows
          </div>
        ),
        className: "bg-secondary opacity-90",
        duration: 1000,
      });
      await followAction(followerId, followingId);
    } else {
      setFollow(false);
      toast({
        description: (
          <div className="flex items-center">
            <CircleCheck className="mr-2 text-green-500" />
            Removed from your follows
          </div>
        ),
        className: "bg-secondary opacity-90",
        duration: 1000,
      });
      await unfollowAction(followerId, followingId);
    }
  };

  return (
    <Button onClick={handleClick} variant="default" className="p-4">
      {follow ? "Unfollow" : "Follow"}
    </Button>
  );
}
