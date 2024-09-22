import { ArtistSelect } from "@/src/entities/models/artist";
import { ArtistCard } from "@/app/_components/artist/artist-card";

type ArtistsCardsProps = {
  artists: ArtistSelect[];
};

export async function ArtistsCards({ artists }: ArtistsCardsProps) {
  return (
    <>
      {artists.length > 0 ? (
        artists.map((item) => {
          return <ArtistCard key={item.id} artist={item} />;
        })
      ) : (
        <span className="pl-4 pt-8 text-lg">No artists</span>
      )}
    </>
  );
}
