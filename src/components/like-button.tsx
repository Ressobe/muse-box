"use client";

import { HeartIcon } from "lucide-react";
import { Button } from "./ui/button";
import { likeAction, unlikeAction } from "@/actions/playlists";
import { Entity } from "@/types";
import { useState } from "react";
import clsx from "clsx";

type LikeButtonProps = {
  defaultLikeState: boolean;
  userId: string;
  entityId: string;
  type: Entity;
  size?: "lg" | "md";
};

export function LikeButton({
  defaultLikeState,
  userId,
  entityId,
  type,
  size = "lg",
}: LikeButtonProps) {
  const [like, setLike] = useState(defaultLikeState);

  const handleClick = async () => {
    if (!like) {
      setLike(true);
      await likeAction(userId, entityId, type);
    } else {
      setLike(false);
      await unlikeAction(userId, entityId, type);
    }
  };

  return (
    <Button onClick={handleClick} variant="ghost" className="p-4">
      <HeartIcon
        className={clsx(
          size === "lg" && "w-8 h-8",
          size === "md" && "w-6 h-6",
          "transition-colors",
        )}
        fill={like ? "white" : ""}
      />
    </Button>
  );
}
