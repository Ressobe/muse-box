"use client";

import { SubmitButton } from "@/src/components/submit-button";
import { useToast } from "@/src/components/ui/use-toast";
import { Heart } from "lucide-react";
import { useState } from "react";
import likeArtistAction from "./_actions/like-artist";
import unlikeArtistAction from "./_actions/unlike-artist";

type LikeButtonProps = {
  artistId: string;
  profileId?: string;
  isLiked: boolean;
};

export default function LikeButton({
  artistId,
  profileId,
  isLiked,
}: LikeButtonProps) {
  const [liked, setLiked] = useState(isLiked);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!profileId) {
      toast({
        variant: "destructive",
        title: "Unable to like",
        description:
          "If you'd like this artist, please log in to your account first.",
      });
      return;
    }

    if (liked) {
      await unlikeArtistAction(artistId, profileId);
      setLiked(false);
      return;
    }

    await likeArtistAction(artistId, profileId);
    setLiked(true);
    return;
  };

  return (
    <form action={handleSubmit}>
      <SubmitButton className="cursor-pointer">
        <Heart className={liked ? "fill-current" : "fill-none"} />
      </SubmitButton>
    </form>
  );
}
