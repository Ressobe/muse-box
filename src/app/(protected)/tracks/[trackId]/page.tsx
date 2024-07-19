import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getTime, getYear } from "@/lib/utils";
import { getArtistUseCase } from "@/use-cases/artist";
import { getTrackUseCase } from "@/use-cases/track";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default async function TrackPage({
  params,
}: {
  params: {
    trackId: string;
  };
}) {
  const { trackId } = params;
  const track = await getTrackUseCase(trackId);

  if (!track) {
    return notFound();
  }

  const artist = await getArtistUseCase(track.album.artistId);

  if (!artist) {
    return notFound();
  }

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-16">
        <Image src={track.image ?? ""} width={200} height={200} alt="dkdk" />
        <div className="space-y-8">
          <div>
            <div>Song</div>
            <h1 className="font-bold text-5xl">{track.title}</h1>
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <Avatar className="h-16 w-16">
              <AvatarImage src={artist.image ?? ""} />
              <AvatarFallback>
                <FaUser className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/artists/${artist.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {artist.name}
            </Link>
            <span>{getYear(track.album.releaseDate)}</span>
            <Link
              href={`/albums/${track.album.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {track.album.title}
            </Link>
            <span>{getTime(track.length)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
