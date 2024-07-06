import {
  getNewAlbumsUseCase,
  getPopularAlbumsUseCase,
  getTopAlbumsUseCase,
} from "@/use-cases/album";
import Image from "next/image";
import Link from "next/link";

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
            return (
              <AlbumCard key={album.id} name={album.title} id={album.id} />
            );
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">Popular albums</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {popularAlbums.map((album) => {
            return (
              <AlbumCard key={album.id} name={album.title} id={album.id} />
            );
          })}
        </div>
      </section>

      <section>
        <h1 className="font-bold text-3xl">New albums</h1>
        <div className="flex flex-wrap gap-y-6 gap-x-10 pt-4">
          {newAlbums.map((album) => {
            return (
              <AlbumCard key={album.id} name={album.title} id={album.id} />
            );
          })}
        </div>
      </section>
    </section>
  );
}

function AlbumCard({ name, id }: { name: string; id: string }) {
  return (
    <Link
      href={`/albums/${id}`}
      className="transition-all p-4 hover:bg-secondary/40 rounded"
    >
      <div>
        <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
        <div className="pt-4">{name}</div>
        <div className="text-muted-foreground">2016</div>
      </div>
    </Link>
  );
}
