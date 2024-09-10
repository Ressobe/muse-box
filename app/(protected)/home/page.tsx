import { TopAlbumsTable } from "@/app/_components/album/top-albums-table";
import { TopArtistsTable } from "@/app/_components/artist/top-artists-table";
import { TopTracksTable } from "@/app/_components/track/top-tracks-table";
import { currentUser } from "@/lib/auth";
import { getTopAlbumsController } from "@/src/interface-adapters/controllers/album/get-top-albums.controller";
import { getTopArtistsController } from "@/src/interface-adapters/controllers/artist/get-top-artists.controller";
import { getTopTracksController } from "@/src/interface-adapters/controllers/track/get-top-tracks.controller";

export default async function HomePage() {
  const user = await currentUser();
  if (!user) return null;

  const topArtists = await getTopArtistsController();
  const topAlbums = await getTopAlbumsController();
  const topTracks = await getTopTracksController();

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
