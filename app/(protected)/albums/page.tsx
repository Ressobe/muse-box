import { AlbumCard } from "@/app/_components/album/album-card";
import { Album } from "@/src/entities/models/album";
import { SeeMoreButton } from "@/app/_components/see-more-button";
import { getNewAlbumsController } from "@/src/interface-adapters/controllers/album/get-new-albums.controller";
import { getPopularAlbumsController } from "@/src/interface-adapters/controllers/album/get-popular-albums.controller";
import { getTopAlbumsController } from "@/src/interface-adapters/controllers/album/get-top-albums.controller";
import { unstable_cache as cache } from "next/cache";

const getCachedTopAlbums = cache(
  async () => getTopAlbumsController(),
  ["top-albums"],
  { revalidate: 600 },
);

const getCachedPopularAlbums = cache(
  async () => getPopularAlbumsController(),
  ["popular-albums"],
  { revalidate: 600 },
);

const getCachedNewAlbums = cache(
  async () => getNewAlbumsController(),
  ["new-albums"],
  { revalidate: 600 },
);

export default async function AlbumsPage() {
  const topAlbums = await getCachedTopAlbums();
  const popularAlbums = await getCachedPopularAlbums();
  const newAlbums = await getCachedNewAlbums();

  return (
    <section className="w-full space-y-20">
      <div>
        <AlbumsSection title="Top albums" albums={topAlbums} />
        <SeeMoreButton href="/albums/search" />
      </div>
      <div>
        <AlbumsSection title="Popular albums" albums={popularAlbums} />
        <SeeMoreButton href="/albums/search" />
      </div>
      <div>
        <AlbumsSection title="New albums" albums={newAlbums} />
        <SeeMoreButton href="/albums/search" />
      </div>
    </section>
  );
}

type AlbumsSectionProps = {
  title: string;
  albums: Album[];
};

function AlbumsSection({ title, albums }: AlbumsSectionProps) {
  return (
    <section>
      <h1 className="font-bold text-3xl">{title}</h1>
      <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
        {albums.map((album) => {
          return <AlbumCard key={album.id} album={album} />;
        })}
      </div>
    </section>
  );
}
