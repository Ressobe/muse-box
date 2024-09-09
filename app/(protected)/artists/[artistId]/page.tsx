import { notFound } from "next/navigation";
import { TopTracks } from "@/app/_components/track/top-tracks";
import { Albums } from "@/app/_components/album/albums";
import { SinglesEps } from "@/app/_components/album/single-eps";
import { Reviews } from "@/app/_components/review/reviews";
import { ArtistHeader } from "@/app/_components/artist/artist-header";
import { getArtistInfoController } from "@/src/interface-adapters/controllers/artist/get-artist-info.controller";
import { Suspense } from "react";
import { getArtistSinglesEpsController } from "@/src/interface-adapters/controllers/artist/get-artist-singles-eps.controller";
import { getArtistTopTracksController } from "@/src/interface-adapters/controllers/artist/get-artist-top-tracks.controller";
import { getReviewsForArtistController } from "@/src/interface-adapters/controllers/review/get-reviews-for-artist.controller";
import { shouldShowAddReviewController } from "@/src/interface-adapters/controllers/review/should-show-add-review.controller";
import { AlbumsLoading } from "@/app/_components/loading/albums-loading";
import { TracksLoading } from "@/app/_components/loading/tracks-loading";
import { ArtistHeaderLoading } from "@/app/_components/loading/artist-header-loading";

export default async function Artist({
  params,
}: {
  params: { artistId: string };
}) {
  const { artistId } = params;

  const artistInfoData = getArtistInfoController(artistId);
  const tracksData = getArtistTopTracksController(artistId);
  const singlesEpsData = getArtistSinglesEpsController(artistId);
  const reviewsData = getReviewsForArtistController(artistId);
  const showAddReviewData = shouldShowAddReviewController(artistId, "artist");

  const [artistInfo, tracks, singlesEps, reviews, showAddReview] =
    await Promise.all([
      artistInfoData,
      tracksData,
      singlesEpsData,
      reviewsData,
      showAddReviewData,
    ]);

  if (!artistInfo.artist) {
    return notFound();
  }

  return (
    <section className="space-y-20">
      <Suspense fallback={<ArtistHeaderLoading />}>
        <ArtistHeader
          artist={artistInfo.artist}
          genres={artistInfo.genres}
          isLiked={artistInfo.isLiked}
        />
      </Suspense>

      <div>
        <h2 className="font-bold text-3xl pb-6">Top tracks</h2>
        <Suspense fallback={<TracksLoading />}>
          <TopTracks topTracks={tracks} />
        </Suspense>
      </div>

      <Suspense fallback={<AlbumsLoading />}>
        <Albums artistId={artistId} />
      </Suspense>
      <Suspense fallback={<AlbumsLoading />}>
        <SinglesEps artistId={artistId} singlesEps={singlesEps} />
      </Suspense>
      <Suspense>
        <Reviews
          reviews={reviews}
          showAddReview={showAddReview}
          type="artist"
          entityId={artistId}
          entityName={artistInfo.artist.name}
        />
      </Suspense>
    </section>
  );
}
