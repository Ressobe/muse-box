import {
  getNewAlbumsUseCase,
  getPopularAlbumsUseCase,
  getTopAlbumsUseCase,
} from "@/use-cases/album";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AlbumsPage() {
  const topAlbums = await getTopAlbumsUseCase();
  const popularAlbums = await getPopularAlbumsUseCase();
  const newAlbums = await getNewAlbumsUseCase();

  return (
    <section className="w-full space-y-10">
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

type TAlbum = {
  id: string;
  image: string | null;
  artistId: string;
  typeId: number;
  title: string;
  length: number | null;
  releaseDate: Date | null;
};

type AlbumCardProps = {
  album: TAlbum;
};

function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link
      href={`/albums/${album.id}`}
      className="transition-all p-4 hover:bg-secondary/40 rounded"
    >
      <div>
        <Image src={album.image ?? ""} width={200} height={200} alt="dkdk" />
        <div className="pt-4">{album.title}</div>
        <div className="text-muted-foreground">
          {album.releaseDate && new Date(album.releaseDate).getFullYear()}
        </div>
      </div>
    </Link>
  );
}
