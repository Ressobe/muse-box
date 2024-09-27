import { ArtistCard } from "@/app/_components/artist/artist-card";
import { ArtistSelect } from "@/src/entities/models/artist";
import { SeeMoreButton } from "@/app/_components/see-more-button";
import { getNewArtistsController } from "@/src/interface-adapters/controllers/artist/get-new-artists.controller";
import { getPopularArtistsController } from "@/src/interface-adapters/controllers/artist/get-popular-artists.controller";
import { getTopArtistsController } from "@/src/interface-adapters/controllers/artist/get-top-artists.controller";
import { unstable_cache as cache } from "next/cache";
import { Suspense } from "react";
import { CardsLoading } from "@/app/_components/loading/cards-loading";

const getCachedTopArtists = cache(
  async () => getTopArtistsController({ withAuthUserInfo: false }),
  ["top-artists"],
  { revalidate: 600 },
);

const getCachedPopularArtists = cache(
  async () => getPopularArtistsController(),
  ["popular-artists"],
  { revalidate: 600 },
);

const getCachedNewArtists = cache(
  async () => getNewArtistsController(),
  ["new-artists"],
  { revalidate: 600 },
);

export default async function Artists() {
  const topArtists = await getCachedTopArtists();
  const popularArtists = await getCachedPopularArtists();
  const newArtists = await getCachedNewArtists();

  return (
    <section className="w-full space-y-20">
      <div>
        <Suspense fallback={<CardsLoading />}>
          <ArtistsSection title="Top artists" artists={topArtists} />
        </Suspense>
        <SeeMoreButton href="/artists/search" />
      </div>
      <div>
        <Suspense fallback={<CardsLoading />}>
          <ArtistsSection title="Popular artists" artists={popularArtists} />
        </Suspense>
        <SeeMoreButton href="/artists/search" />
      </div>
      <div>
        <Suspense fallback={<CardsLoading />}>
          <ArtistsSection title="New artists" artists={newArtists} />
        </Suspense>
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
