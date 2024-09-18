import { ArtistCard } from "@/app/_components/artist/artist-card";
import { ArtistSelect } from "@/src/entities/models/artist";
import { SeeMoreButton } from "@/app/_components/see-more-button";
import { getNewArtistsController } from "@/src/interface-adapters/controllers/artist/get-new-artists.controller";
import { getPopularArtistsController } from "@/src/interface-adapters/controllers/artist/get-popular-artists.controller";
import { getTopArtistsController } from "@/src/interface-adapters/controllers/artist/get-top-artists.controller";

export default async function Artists() {
  const topArtists = await getTopArtistsController();
  const popularArtists = await getPopularArtistsController();
  const newArtists = await getNewArtistsController();

  return (
    <section className="w-full space-y-20">
      <div>
        <ArtistsSection title="Top artists" artists={topArtists} />
        <SeeMoreButton href="/artists/search" />
      </div>
      <div>
        <ArtistsSection title="Popular artists" artists={popularArtists} />
        <SeeMoreButton href="/artists/search" />
      </div>
      <div>
        <ArtistsSection title="New artists" artists={newArtists} />
        <SeeMoreButton href="/artists/search" />
      </div>
    </section>
  );
}

type ArtistsSectionProps = {
  title: string;
  artists: ArtistSelect[];
};

function ArtistsSection({ title, artists }: ArtistsSectionProps) {
  return (
    <section>
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
        {artists.map((artist) => {
          return <ArtistCard key={artist.id} artist={artist} />;
        })}
      </div>
    </section>
  );
}
