"use client";

import { useOptimistic } from "react";
import ArtistStats from "./artist-stats";
import FollowButton from "./follow-button";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import ArtistInfo from "./artist-info";

type Artist = {
  id: string;
  name: string;
  stats?: {
    id?: number;
    avg_rating?: number;
    amount_of_ratings?: number;
    amount_of_albums?: number;
    amount_of_singles?: number;
    amount_of_tracks?: number;
    amount_of_followers?: number;
    visits?: number;
    ownerId?: string;
  } | null;
  popularity: number;
  isFollowed: boolean;
};

type ArtistCardProps = {
  artist: Artist;
  profileId?: string;
};

export default function ArtistCard({ artist, profileId }: ArtistCardProps) {
  const [optimisiticFollowers, addOptimisticFollowers] = useOptimistic(
    artist.stats?.amount_of_followers || 0,
    (state, f) => state + Number(f)
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
      <div className="flex gap-x-4">
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
