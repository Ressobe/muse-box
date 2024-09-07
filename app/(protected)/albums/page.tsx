import { AlbumCard } from "@/app/_components/album/album-card";
import { getNewAlbumsController } from "@/src/interface-adapters/controllers/album/get-new-albums.controller";
import { getPopularAlbumsController } from "@/src/interface-adapters/controllers/album/get-popular-albums.controller";
import { getTopAlbumsController } from "@/src/interface-adapters/controllers/album/get-top-albums.controller";

export const dynamic = "force-dynamic";

export default async function AlbumsPage() {
  const topAlbums = await getTopAlbumsController();
  const popularAlbums = await getPopularAlbumsController();
  const newAlbums = await getNewAlbumsController();

  return (
    <section className="w-full space-y-20">
      <section>
        <h1 className="font-bold text-3xl">Top albums</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {topAlbums.map((album) => {
            return <AlbumCard key={album.id} album={album} />;
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">Popular albums</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {popularAlbums.map((album) => {
            return <AlbumCard key={album.id} album={album} />;
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">New albums</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {newAlbums.map((album) => {
            return <AlbumCard key={album.id} album={album} />;
          })}
        </div>
      </section>
    </section>
  );
}
