import { AlbumsTable } from "@/app/_components/album/albums-table";
import { ArtistsTable } from "@/app/_components/artist/artists-table";
import { TableLoading } from "@/app/_components/loading/table-loading";
import { TracksTable } from "@/app/_components/track/tracks-table";
import { getTopAlbumsController } from "@/src/interface-adapters/controllers/album/get-top-albums.controller";
import { getTopArtistsController } from "@/src/interface-adapters/controllers/artist/get-top-artists.controller";
import { getTopTracksController } from "@/src/interface-adapters/controllers/track/get-top-tracks.controller";
import { Suspense } from "react";

export default async function HomePage() {
  const topArtists = await getTopArtistsController();
  const topAlbums = await getTopAlbumsController();
  const topTracks = await getTopTracksController();

  return (
    <section className="w-full space-y-20">
      <section>
        <h1 className="font-bold text-2xl md:text-3xl mb-8">Top artists</h1>
        <Suspense fallback={<TableLoading />}>
          <ArtistsTable artists={topArtists} showContentInteraction={true} />
        </Suspense>
      </section>
      <section>
        <h1 className="font-bold text-2xl md:text-3xl mb-8">Top albums</h1>
        <Suspense fallback={<TableLoading />}>
          <AlbumsTable albums={topAlbums} showContentInteraction={true} />
        </Suspense>
      </section>
      <section>
        <h1 className="font-bold text-2xl md:text-3xl mb-8">Top tracks</h1>
        <Suspense fallback={<TableLoading />}>
          <TracksTable tracks={topTracks} showContentInteraction={true} />
        </Suspense>
      </section>
    </section>
  );
}
