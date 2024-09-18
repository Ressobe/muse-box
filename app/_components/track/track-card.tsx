import Image from "next/image";
import Link from "next/link";

type TrackCardProps = {
  track: {
    id: string;
    image: string | null;
    title: string;
    length: number | null;
    albumId: string;
    position: number;
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
};

export function TrackCard({ track }: TrackCardProps) {
  return (
    <Link href={`/tracks/${track.id}`}>
      <div className="max-w-[120px] md:max-w-max flex flex-col items-center md:items-start transition-all p-4 hover:bg-secondary/40 rounded">
        <div className="w-[100px] h-[100px] md:w-[200px] md:h-[200px]">
          <Image
            src={track.image ?? ""}
            width={200}
            height={200}
            alt={`${track.title} cover image`}
            className="object-cover"
          />
        </div>
        <div className="pt-4 max-w-[200px] text-sm md:text-lg text-center md:text-left text-balance">
          {track.title}
        </div>
        <div className="text-muted-foreground text-xs md:text-sm md:text-left">
          {track.album.releaseDate &&
            new Date(track.album.releaseDate).getFullYear()}
        </div>
      </div>
    </Link>
  );
}
