"use client";

import { useOptimistic } from "react";
import ArtistStats from "./artist-stats";
import FollowButton from "./follow-button";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import ArtistInfo from "./artist-info";
import LikeButton from "./like-button";
import { useArtist } from "@/src/context/artist-context";

type ArtistCardProps = {
  profileId?: string;
};

export default function ArtistCard({ profileId }: ArtistCardProps) {
  const { artist } = useArtist();

  const [optimisiticFollowers, addOptimisticFollowers] = useOptimistic(
    artist.stats?.amount_of_followers || 0,
    (state, f) => state + Number(f),
  );

  return (
    <>
      <ArtistInfo
        amountOfAlbums={artist.stats?.amount_of_albums}
        amountOfSingles={artist.stats?.amount_of_singles}
        amountOfTracks={artist.stats?.amount_of_singles}
      />
      <ArtistStats
        avgRating={artist.stats?.avg_rating}
        amountOfRatings={artist.stats?.amount_of_ratings}
        amountOfFollowers={optimisiticFollowers}
        popularity={artist.popularity}
      />
      <div className="flex items-center gap-x-4">
        <LikeButton
          artistId={artist.id}
          profileId={profileId}
          isLiked={artist.isLiked}
        />
        <FollowButton
          artistId={artist.id}
          profileId={profileId}
          isFollowed={artist.isFollowed}
          addOptimisticFollower={() => addOptimisticFollowers(1)}
          removeOptimisticFollower={() => addOptimisticFollowers(-1)}
        />
        <Link href={`/artists/${artist.id}`}>
          <Button size="sm" variant="outline">
            View Profile
          </Button>
        </Link>
      </div>
    </>
  );
}
