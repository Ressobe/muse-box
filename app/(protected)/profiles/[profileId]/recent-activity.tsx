import { ArtistReview } from "@/app/(protected)/profiles/[profileId]/artist-review";
import { getUserLatestReviews } from "@/data-access/user";
import { TAlbumReview, TArtistReview, TTrackReview } from "@/types/review";
import { AlbumReview } from "./album-review";
import { TrackReview } from "./track-reviw";
import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableRow,
} from "@/app/_components/ui/table";

type RecentActivityProps = {
  profileId: string;
};

export async function RecentActivity({ profileId }: RecentActivityProps) {
  const latestActivity = await getUserLatestReviews(profileId);
  if (!latestActivity) {
    return null;
  }

  const renderContent = () => {
    return (
      <>
        {latestActivity.map((item) => {
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
      {latestActivity.length > 0 ? (
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
      ) : (
        <div className="text-xl text-muted-foreground">
          Nothing to see here ...
        </div>
      )}
    </section>
  );
}
