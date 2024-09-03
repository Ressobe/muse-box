import { ArtistCard } from "@/components/artist/artist-card";
import {
  getTopArtistsUseCase,
  getPopularArtistsUseCase,
  getNewArtistsUseCase,
} from "@/use-cases/artist";

export const dynamic = "force-dynamic";

export default async function Artists() {
  const topArtists = await getTopArtistsUseCase();
  const popularArtists = await getPopularArtistsUseCase();
  const newArtists = await getNewArtistsUseCase();

  return (
    <section className="w-full space-y-20">
      <section>
        <h1 className="font-bold text-3xl">Top artists</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {topArtists.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">Popular artists</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {popularArtists.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">New artists</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {newArtists.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
        </div>
      </section>
    </section>
  );
}
