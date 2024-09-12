"use client";

import { TAlbumReview, TArtistReview, TTrackReview } from "@/types/review";
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

type LatestReviewsProps = {
  profileId: string;
  initialActivity: (TArtistReview | TAlbumReview | TTrackReview)[];
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
                  artistReview={item as TArtistReview}
                />
              );
            case "album":
              return (
                <AlbumReview key={item.id} albumReview={item as TAlbumReview} />
              );
            case "track":
              return (
                <TrackReview key={item.id} trackReview={item as TTrackReview} />
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
