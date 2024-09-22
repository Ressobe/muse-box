import Image from "next/image";
import Link from "next/link";
import { getTime, getYear } from "@/app/_lib/utils";
import { LikeButton } from "@/app/_components/like-button";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { ArtistSmallHeader } from "@/app/_components/artist/artist-small-header";
import { getTrackInfoController } from "@/src/interface-adapters/controllers/track/get-track-info.controller";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

type TrackHeaderProps = {
  trackId: string;
};

export async function TrackHeader({ trackId }: TrackHeaderProps) {
  const track = await getTrackInfoController({ trackId });
  if (!track) {
    return null;
  }

  const userId = await getAuthUserIdController();
  if (!userId) {
    return null;
  }

  const isTrackLiked = await isItemLikedByUserUseCase(
    userId,
    track.id,
    "track",
  );

  return (
    <section>
      <div className="flex items-center gap-x-16">
        <Image src={track.image ?? ""} width={200} height={200} alt="dkdk" />
        <div className="space-y-8">
          <div>
            <div>Song</div>
            <h1 className="font-bold text-5xl">{track.title}</h1>
            <RatingStats
              ratingAvg={track.stats?.ratingAvg}
              ratingCount={track.stats?.ratingCount}
            />
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <ArtistSmallHeader artist={track.album.artist} />
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
              userId={userId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
