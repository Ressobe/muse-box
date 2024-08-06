import Image from "next/image";
import Link from "next/link";

type TrackCardProps = {
  track: {
    id: string;
    image: string | null;
    artistId: string;
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
      <div className="transition-all p-4 hover:bg-secondary/40 rounded">
        <Image
          src={track.image ?? ""}
          width={200}
          height={200}
          alt={`${track.title} cover image`}
        />
        <div className="pt-4">{track.title}</div>
        <div className="text-muted-foreground">
          {track.album.releaseDate &&
            new Date(track.album.releaseDate).getFullYear()}
        </div>
      </div>
    </Link>
  );
}
