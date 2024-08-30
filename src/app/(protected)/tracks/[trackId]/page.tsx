import { auth } from "@/auth";
import { LikeButton } from "@/components/like-button";
import { RatingStats } from "@/components/review/rating-stats";
import { Reviews } from "@/components/review/reviews";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserTrackReview } from "@/data-access/user";
import { currentUser } from "@/lib/auth";
import { getTime, getYear } from "@/lib/utils";
import { getArtistByAlbumIdUseCase } from "@/use-cases/artist";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import { getTrackReviewsUseCase, getTrackUseCase } from "@/use-cases/track";
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
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const artist = await getArtistByAlbumIdUseCase(track.albumId);
  const reviews = await getTrackReviewsUseCase(track.id);
  const isTrackLiked = await isUserLikedItUseCase(user.id, track.id, "track");

  let showAddReview = true;
  const session = await auth();
  if (session && session.user.id) {
    const review = await getUserTrackReview(session.user.id, track.id);
    showAddReview = !review;
  }

  return (
    <section className="space-y-12">
      <div className="flex items-center gap-x-16">
        <Image
          src={track.image ?? ""}
          width={200}
          height={200}
          alt={`${track.title} cover image`}
        />
        <div className="space-y-8">
          <div>
            <div>Song</div>
            <h1 className="font-bold text-5xl mb-2">{track.title}</h1>
            <RatingStats stats={track?.stats} />
          </div>
          <div className="flex items-center gap-x-4 text-sm">
            <Avatar className="h-16 w-16">
              <AvatarImage src={artist?.image ?? ""} />
              <AvatarFallback>
                <FaUser className="w-8 h-8" />
              </AvatarFallback>
            </Avatar>
            <Link
              href={`/artists/${artist?.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {artist?.name}
            </Link>
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
      <Reviews
        reviews={reviews}
        showAddReview={showAddReview}
        type="track"
        entityId={trackId}
        entityName={track.title}
      />
    </section>
  );
}
