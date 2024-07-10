import { getArtistUseCase } from "@/use-cases/artist";
import { getTrackUseCase } from "@/use-cases/track";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  if (!track.album.artistId) {
    return notFound();
  }

  const artist = await getArtistUseCase(track.album.artistId);

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-16">
        <Image src="/taco2.jpeg" width={200} height={200} alt="dkdk" />
        <div className="space-y-8">
          <div>
            <div>Song</div>
            <h1 className="font-bold text-5xl">{track.title}</h1>
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <Image
              src="/taco2.jpeg"
              width={60}
              height={60}
              alt="dkdk"
              className="rounded-full"
            />
            <Link
              href={`/artists/${artist.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {artist.name}
            </Link>
            <span>2016</span>
            <Link
              href={`/albums/${track.album.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {track.album.title}
            </Link>
            <span>3:50</span>
          </div>
        </div>
      </div>
    </section>
  );
}
