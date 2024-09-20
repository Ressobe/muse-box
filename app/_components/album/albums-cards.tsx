import { Album } from "@/src/entities/models/album";
import { AlbumCard } from "@/app/_components/album/album-card";

type AlbumsCardsProps = {
  albums: Album[];
};

export async function AlbumsCards({ albums }: AlbumsCardsProps) {
  return (
    <>
      {albums.length > 0 ? (
        albums.map((item) => {
          return <AlbumCard key={item.id} album={item} />;
        })
      ) : (
        <span className="pl-4 pt-8 text-lg">No albums</span>
      )}
    </>
  );
}
