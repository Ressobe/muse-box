import { ArtistCard } from "@/app/_components/artist/artist-card";
import { ArtistSmallHeader } from "@/app/_components/artist/artist-small-header";
import { LikeButton } from "@/app/_components/like-button";
import { RatingStats } from "@/app/_components/review/rating-stats";
import { Reviews } from "@/app/_components/review/reviews";
import { getTime, getYear } from "@/app/_lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrackInfoController } from "@/src/interface-adapters/controllers/track/get-track-info.controller";
import { getTrackReviewsController } from "@/src/interface-adapters/controllers/track/get-track-reviews.controller";
// import { getTopTracksController } from "@/src/interface-adapters/controllers/track/get-top-tracks.controller";
// import { getPopularTracksController } from "@/src/interface-adapters/controllers/track/get-popular-tracks.controller";
// import { getNewTracksController } from "@/src/interface-adapters/controllers/track/get-new-tracks.controller";
import { getReviewForTrackOwnedByUserUseCase } from "@/src/application/use-cases/review/get-review-for-track-owned-by-user.use-case";
import { getAuthUserIdController } from "@/src/interface-adapters/controllers/auth/get-auth-user-id.controller";

// export async function generateStaticParams() {
//   const topTracks = await getTopTracksController();
//   const popularTracks = await getPopularTracksController();
//   const newTracks = await getNewTracksController();
//
//   return [...topTracks, ...popularTracks, ...newTracks].map((item) => ({
//     trackId: item.id,
//   }));
// }

export default async function TrackPage({
  params,
}: {
  params: {
    trackId: string;
  };
}) {
  const { trackId } = params;
  const track = await getTrackInfoController({ trackId });

  if (!track) {
    return notFound();
  }
  const authUserId = await getAuthUserIdController();
  if (!authUserId) {
    return null;
  }

  const reviews = await getTrackReviewsController({ trackId: track.id });

  const showAddReview = !(await getReviewForTrackOwnedByUserUseCase(
    track.id,
    authUserId,
  ));

  const credits = track.artistCredit.artistsCreditsNames;

  return (
    <section className="space-y-20">
      <div className="flex flex-col justify-center sm:justify-start sm:flex-row items-center gap-x-16">
        <Image
          src={track.image ?? ""}
          width={200}
          height={200}
          alt={`${track.title} cover image`}
        />
        <div className="pt-12 sm:pt-0 space-y-8">
          <div>
            <div>Song</div>
            <h1 className="font-bold text-3xl md:text-5xl mb-2">
              {track.title}
            </h1>
            <RatingStats
              ratingAvg={track.stats?.ratingAvg}
              ratingCount={track.stats?.ratingCount}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-y-4 items-center gap-x-4 text-sm">
            <ArtistSmallHeader artist={track.album.artist} />
            <span className="w-2 h-2 hidden sm:block bg-foreground rounded-full"></span>
            <span className="hidden sm:block">
              {getYear(track.album.releaseDate)}
            </span>
            <span className="w-2 h-2 hidden sm:block bg-foreground rounded-full"></span>
            <Link
              href={`/albums/${track.album.id}`}
              className="transition-all underline-offset-2 hover:underline"
            >
              {track.album.title}
            </Link>

            <span className="w-2 h-2 hidden sm:block bg-foreground rounded-full"></span>
            <span className="hidden sm:block">{getTime(track.length)}</span>
            {track.isLiked !== undefined && (
              <LikeButton
                defaultLikeState={track.isLiked}
                entityId={track.id}
                type="track"
                userId={authUserId}
              />
            )}
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
