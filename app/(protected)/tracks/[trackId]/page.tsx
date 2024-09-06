import { auth } from "@/auth";
import { ArtistCard } from "@/components/artist/artist-card";
import { ArtistSmallHeader } from "@/components/artist/artist-small-header";
import { LikeButton } from "@/components/like-button";
import { RatingStats } from "@/components/review/rating-stats";
import { Reviews } from "@/components/review/reviews";
import { getUserTrackReview } from "@/data-access/user";
import { currentUser } from "@/lib/auth";
import { getTime, getYear } from "@/lib/utils";
import { isUserLikedItUseCase } from "@/use-cases/playlist";
import { getTrackReviewsUseCase, getTrackUseCase } from "@/use-cases/track";
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
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const reviews = await getTrackReviewsUseCase(track.id);
  const isTrackLiked = await isUserLikedItUseCase(user.id, track.id, "track");

  let showAddReview = true;
  const session = await auth();
  if (session && session.user.id) {
    const review = await getUserTrackReview(session.user.id, track.id);
    showAddReview = !review;
  }

  const credits = track.artistCredit.artistsCreditsNames;

  return (
    <section className="space-y-20">
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
            <ArtistSmallHeader artist={track.album.artist} />
            <span className="w-2 h-2 bg-foreground rounded-full"></span>
            <span>{getYear(track.album.releaseDate)}</span>
            <span className="w-2 h-2 bg-foreground rounded-full"></span>
            <Link
              href={`/albums/${track.album.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {track.album.title}
            </Link>
            <span className="w-2 h-2 bg-foreground rounded-full"></span>
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
      {credits.length > 1 && (
        <div>
          <h2 className="text-3xl font-bold">Feats: </h2>
          <ul className="flex flex-wrap gap-8">
            {credits.slice(1).map((item) => {
              return (
                <ArtistCard
                  key={item.artistId}
                  artist={item.artist}
                  size="lg"
                />
              );
            })}
          </ul>
        </div>
      )}
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
