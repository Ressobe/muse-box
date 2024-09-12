import { ArtistCard } from "@/app/_components/artist/artist-card";
import { SeeMoreButton } from "@/app/_components/see-more-button";
import { getNewArtistsController } from "@/src/interface-adapters/controllers/artist/get-new-artists.controller";
import { getPopularArtistsController } from "@/src/interface-adapters/controllers/artist/get-popular-artists.controller";
import { getTopArtistsController } from "@/src/interface-adapters/controllers/artist/get-top-artists.controller";

export const dynamic = "force-dynamic";

export default async function Artists() {
  const topArtists = await getTopArtistsController();
  const popularArtists = await getPopularArtistsController();
  const newArtists = await getNewArtistsController();

  return (
    <section className="w-full space-y-20">
      <section>
        <h1 className="font-bold text-2xl md:text-3xl">Top artists</h1>
        <div className="flex justify-center sm:justify-start flex-wrap gap-y-6 gap-x-10 pt-4">
          {topArtists.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
        </div>
        <SeeMoreButton href="/artists/search" />
      </section>

      <section>
        <h1 className="font-bold text-xl md:text-3xl">Popular artists</h1>
        <div className="flex justify-center sm:justify-start flex-wrap gap-y-6 gap-x-10 pt-4">
          {popularArtists.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
        </div>
        <SeeMoreButton href="/artists/search" />
      </section>

      <section>
        <h1 className="font-bold text-xl md:text-3xl">New artists</h1>
        <div className="flex justify-center sm:justify-start flex-wrap gap-y-6 gap-x-10 pt-4">
          {newArtists.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
        </div>
        <SeeMoreButton href="/artists/search" />
      </section>
    </section>
  );
}
