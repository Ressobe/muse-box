"use client";

import { CircleCheck, HeartIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { likeAction, unlikeAction } from "@/app/_actions/playlists";
import { useState } from "react";
import { useToast } from "@/app/_components/ui/use-toast";
import { capitalizeFirstLetter } from "@/app/_lib/utils";
import { Content } from "@/src/entities/models/content";

type LikeButtonProps = {
  defaultLikeState: boolean;
  userId?: string;
  entityId: string;
  type: Content;
  size?: "lg" | "md";
};

export function LikeButton({
  defaultLikeState,
  userId,
  entityId,
  type,
  size = "lg",
}: LikeButtonProps) {
  const { toast } = useToast();
  const [like, setLike] = useState(defaultLikeState);

  if (!userId) return null;

  const handleClick = async () => {
    if (!like) {
      setLike(true);
      toast({
        description: (
          <div className="flex items-center">
            <CircleCheck className="mr-2 text-green-500" />
            {`Added to your liked ${capitalizeFirstLetter(type)}s`}
          </div>
        ),
        className: "bg-secondary opacity-90",
        duration: 1000,
      });
      await likeAction(userId, entityId, type);
    } else {
      setLike(false);
      toast({
        description: (
          <div className="flex items-center">
            <CircleCheck className="mr-2 text-green-500" />
            {`Removed from your liked ${capitalizeFirstLetter(type)}s`}
          </div>
        ),
        className: "bg-secondary opacity-90",
        duration: 1000,
      });
      await unlikeAction(userId, entityId, type);
    }
  };

  return (
    <Button onClick={handleClick} variant="ghost" className="p-4">
      <HeartIcon className="h-6 w-6 md:h-8 md:w-8" fill={like ? "white" : ""} />
    </Button>
  );
}
