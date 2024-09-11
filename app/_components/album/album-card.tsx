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
      <div className="max-w-[120px] md:max-w-max flex flex-col items-center md:items-start transition-all p-4 hover:bg-secondary/40 rounded">
        <div className="h-[100px] w-[100px] md:w-[200px] md:h-[200px]">
          <Image
            src={album.image ?? ""}
            width={200}
            height={200}
            alt={`${album.title} cover image`}
            className="object-cover"
          />
        </div>
        <div className="pt-4 max-w-[200px] text-sm md:text-lg text-center md:text-left text-balance">
          {album.title}
        </div>
        <div className="text-muted-foreground text-xs md:text-sm md:text-left">
          {album.releaseDate && new Date(album.releaseDate).getFullYear()}
        </div>
      </div>
    </Link>
  );
}
