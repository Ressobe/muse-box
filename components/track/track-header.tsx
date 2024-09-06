import { currentUser } from "@/lib/auth";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import { getTrackUseCase } from "@/use-cases/track";
import Image from "next/image";
import Link from "next/link";
import { getTime, getYear } from "@/lib/utils";
import { LikeButton } from "@/components/like-button";
import { getArtistByAlbumId } from "@/data-access/artist";
import { RatingStats } from "@/components/review/rating-stats";
import { ArtistSmallHeader } from "@/components/artist/artist-small-header";

type TrackHeaderProps = {
  trackId: string;
};

export async function TrackHeader({ trackId }: TrackHeaderProps) {
  const track = await getTrackUseCase(trackId);
  if (!track) {
    return null;
  }

  const artist = await getArtistByAlbumId(track.albumId);
  if (!artist) {
    return null;
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }

  const isTrackLiked = await isUserLikedItUseCase(user.id, track.id, "track");

  return (
    <section>
      <div className="flex items-center gap-x-16">
        <Image src={track.image ?? ""} width={200} height={200} alt="dkdk" />
        <div className="space-y-8">
          <div>
            <div>Song</div>
            <h1 className="font-bold text-5xl">{track.title}</h1>
            <RatingStats stats={track?.stats} />
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <ArtistSmallHeader artist={artist} />
            <span>{getYear(track.album.releaseDate)}</span>
            <Link
              href={`/albums/${track.album.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {track.album.title}
            </Link>
            <span>{getTime(track.length)}</span>
            <LikeButton
              defaultLikeState={isTrackLiked}
              entityId={track.id}
              type="track"
              userId={user.id}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
