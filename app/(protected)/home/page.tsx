import { AlbumsTable } from "@/app/_components/album/albums-table";
import { ArtistsTable } from "@/app/_components/artist/artists-table";
import { TracksTable } from "@/app/_components/track/tracks-table";
import { getTopAlbumsController } from "@/src/interface-adapters/controllers/album/get-top-albums.controller";
import { getTopArtistsController } from "@/src/interface-adapters/controllers/artist/get-top-artists.controller";
import { getTopTracksController } from "@/src/interface-adapters/controllers/track/get-top-tracks.controller";
import { Suspense } from "react";

export default async function HomePage() {
  const topArtistsData = getTopArtistsController();
  const topAlbumsData = getTopAlbumsController();
  const topTracksData = getTopTracksController();

  const [topArtists, topAlbums, topTracks] = await Promise.all([
    topArtistsData,
    topAlbumsData,
    topTracksData,
  ]);

  return (
    <section className="w-full space-y-20">
      <section>
        <h1 className="font-bold text-3xl mb-8">Top artists</h1>
        <Suspense>
          <ArtistsTable artists={topArtists} showContentInteraction={true} />
        </Suspense>
      </section>
      <section>
        <h1 className="font-bold text-3xl mb-8">Top albums</h1>
        <Suspense>
          <AlbumsTable albums={topAlbums} showContentInteraction={true} />
        </Suspense>
      </section>
      <section>
        <h1 className="font-bold text-3xl mb-8">Top tracks</h1>
        <Suspense>
          <TracksTable tracks={topTracks} showContentInteraction={true} />
        </Suspense>
      </section>
    </section>
  );
}
