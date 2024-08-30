import { AlbumCard } from "@/components/album/album-card";
import {
  getNewAlbumsUseCase,
  getPopularAlbumsUseCase,
  getTopAlbumsUseCase,
} from "@/use-cases/album";

export const dynamic = "force-dynamic";

export default async function AlbumsPage() {
  const topAlbums = await getTopAlbumsUseCase();
  const popularAlbums = await getPopularAlbumsUseCase();
  const newAlbums = await getNewAlbumsUseCase();

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
