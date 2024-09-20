import { TrackWithAlbum } from "@/src/entities/models/track";
import { TrackCard } from "@/app/_components/track/track-card";

type TracksCardsProps = {
  tracks: TrackWithAlbum[];
};

export async function TracksCards({ tracks }: TracksCardsProps) {
  return (
    <>
      {tracks.length > 0 ? (
        tracks.map((item) => {
          return <TrackCard key={item.id} track={item} />;
        })
      ) : (
        <span className="pl-4 pt-8 text-lg">No tracks</span>
      )}
    </>
  );
}
