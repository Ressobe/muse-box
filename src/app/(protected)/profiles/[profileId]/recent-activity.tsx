import { ArtistReview } from "@/app/(protected)/profiles/[profileId]/artist-review";
import { getUserLatestReviews } from "@/data-access/user";
import { TAlbumReview, TArtistReview, TTrackReview } from "@/types/review";
import { AlbumReview } from "./album-review";
import { TrackReview } from "./track-reviw";

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
      <ul>
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
      </ul>
    );
  };

  return (
    <div>
      <h1 className="font-bold text-4xl">Latest reviews</h1>
      {renderContent()}
    </div>
  );
}
