import { TopAlbumsTable } from "@/components/album/top-albums-table";
import { TopArtistsTable } from "@/components/artist/top-artists-table";
import { TopTracksTable } from "@/components/track/top-tracks-table";
import { currentUser } from "@/lib/auth";
import { getTopAlbumsUseCase } from "@/use-cases/album";
import { getTopArtistsUseCase } from "@/use-cases/artist";
import { getTopTracksUseCase } from "@/use-cases/track";

export default async function HomePage() {
  const user = await currentUser();
  if (!user) return null;

  const topArtists = await getTopArtistsUseCase();
  const topAlbums = await getTopAlbumsUseCase();
  const topTracks = await getTopTracksUseCase();

  return (
    <section className="w-full space-y-20">
      <section>
        <h1 className="font-bold text-3xl mb-8">Top artists</h1>
        <TopArtistsTable artists={topArtists} userId={user.id} />
      </section>
      <section>
        <h1 className="font-bold text-3xl mb-8">Top albums</h1>
        <TopAlbumsTable albums={topAlbums} userId={user.id} />
      </section>
      <section>
        <h1 className="font-bold text-3xl mb-8">Top tracks</h1>
        <TopTracksTable tracks={topTracks} userId={user.id} />
      </section>
    </section>
  );
}
