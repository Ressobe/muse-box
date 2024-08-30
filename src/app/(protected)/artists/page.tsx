import { ArtistCard } from "@/components/artist/artist-card";
import { getArtists, getTopArtists } from "@/data-access/artist";

export const dynamic = "force-dynamic";

export default async function Artists() {
  const topArtists = await getTopArtists();
  const artists = await getArtists();

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
          {artists.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">New artists</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {artists.map((artist) => {
            return <ArtistCard key={artist.id} artist={artist} />;
          })}
        </div>
      </section>
    </section>
  );
}
