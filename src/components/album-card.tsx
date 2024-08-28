import Image from "next/image";
import Link from "next/link";

type AlbumCardProps = {
  album: {
    id: string;
    image: string | null;
    artistId: string;
    typeId: number;
    title: string;
    length: number | null;
    releaseDate: Date | null;
  };
};

export function AlbumCard({ album }: AlbumCardProps) {
  return (
    <Link href={`/albums/${album.id}`}>
      <div className="transition-all p-4 hover:bg-secondary/40 rounded">
        {/* <Image src={album.image ?? ""} width={200} height={200} alt="dkdk" /> */}
        <div className="pt-4">{album.title}</div>
        <div className="text-muted-foreground">
          {album.releaseDate && new Date(album.releaseDate).getFullYear()}
        </div>
      </div>
    </Link>
  );
}
