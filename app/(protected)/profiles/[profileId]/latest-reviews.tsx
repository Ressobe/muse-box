"use client";

import { ArtistReview } from "@/app/(protected)/profiles/[profileId]/artist-review";
import { AlbumReview } from "./album-review";
import { TrackReview } from "./track-reviw";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/app/_components/ui/table";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import { ArrowDownNarrowWide } from "lucide-react";
import { getUserLatestReviewsAction } from "@/app/_actions/reviews";
import {
  ReviewWithAlbumRelations,
  ReviewWithArtist,
  ReviewWithTrackRelations,
} from "@/src/entities/models/review";

type LatestReviewsProps = {
  profileId: string;
  initialActivity: (
    | ReviewWithArtist
    | ReviewWithAlbumRelations
    | ReviewWithTrackRelations
  )[];
};

export function LatestReviews({
  profileId,
  initialActivity,
}: LatestReviewsProps) {
  const [activity, setActivity] = useState(initialActivity);
  const [showButton, setShowButton] = useState(true);

  const handleClick = async () => {
    const allActivity = await getUserLatestReviewsAction(profileId);

    setActivity([...allActivity]);
    setShowButton(false);
  };

  const renderContent = () => {
    return (
      <>
        {activity.map((item) => {
          switch (item.entityType) {
            case "artist":
              return (
                <ArtistReview
                  key={item.id}
                  artistReview={item as ReviewWithArtist}
                />
              );
            case "album":
              return (
                <AlbumReview
                  key={item.id}
                  albumReview={item as ReviewWithAlbumRelations}
                />
              );
            case "track":
              return (
                <TrackReview
                  key={item.id}
                  trackReview={item as ReviewWithTrackRelations}
                />
              );
          }
        })}
      </>
    );
  };

  return (
    <section>
      <h1 className="font-bold text-4xl pb-4">Latest reviews</h1>
      {activity.length > 0 ? (
        <>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="h-0"></TableHead>
                <TableHead className="h-0"></TableHead>
                <TableHead className="h-0"></TableHead>
                <TableHead className="h-0"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="h-full">{renderContent()}</TableBody>
          </Table>

          {showButton && (
            <div className="mt-8 w-full flex justify-center">
              <Button onClick={handleClick}>
                <ArrowDownNarrowWide className="w-4 h-4 md:w-6 md:h-6" />
                See more
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-xl text-muted-foreground">
          Nothing to see here ...
        </div>
      )}
    </section>
  );
}
