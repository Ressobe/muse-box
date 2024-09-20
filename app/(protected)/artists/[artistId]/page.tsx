import { notFound } from "next/navigation";
import { TopTracks } from "@/app/_components/track/top-tracks";
import { Albums } from "@/app/_components/album/albums";
import { SinglesEps } from "@/app/_components/album/single-eps";
import { Reviews } from "@/app/_components/review/reviews";
import { ArtistHeader } from "@/app/_components/artist/artist-header";
import { getArtistInfoController } from "@/src/interface-adapters/controllers/artist/get-artist-info.controller";
import { getArtistSinglesEpsController } from "@/src/interface-adapters/controllers/artist/get-artist-singles-eps.controller";
import { getArtistTopTracksController } from "@/src/interface-adapters/controllers/artist/get-artist-top-tracks.controller";
import { getReviewsForArtistController } from "@/src/interface-adapters/controllers/review/get-reviews-for-artist.controller";
import { shouldShowAddReviewController } from "@/src/interface-adapters/controllers/review/should-show-add-review.controller";
import { AlbumsLoading } from "@/app/_components/loading/albums-loading";
import { TracksLoading } from "@/app/_components/loading/tracks-loading";
import { ArtistHeaderLoading } from "@/app/_components/loading/artist-header-loading";
import { Suspense } from "react";
import { getTopArtistsController } from "@/src/interface-adapters/controllers/artist/get-top-artists.controller";
import { getPopularArtistsController } from "@/src/interface-adapters/controllers/artist/get-popular-artists.controller";
import { getNewArtistsController } from "@/src/interface-adapters/controllers/artist/get-new-artists.controller";
import { getArtistAlbumsController } from "@/src/interface-adapters/controllers/artist/get-artist-albums.controller";

export async function generateStaticParams() {
  const topArtists = await getTopArtistsController();
  const popularArtists = await getPopularArtistsController();
  const newArtists = await getNewArtistsController();

  return [...topArtists, ...popularArtists, ...newArtists].map((item) => ({
    artistId: item.id,
  }));
}

export default async function Artist({
  params,
}: {
  params: { artistId: string };
}) {
  const { artistId } = params;

  const artistInfo = await getArtistInfoController(artistId);
  const tracks = await getArtistTopTracksController(artistId);
  const albums = await getArtistAlbumsController(artistId);
  const singlesEps = await getArtistSinglesEpsController(artistId);
  const reviews = await getReviewsForArtistController(artistId);

  const showAddReview = await shouldShowAddReviewController(artistId, "artist");

  if (!artistInfo.artist) {
    notFound();
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
        <Albums artistId={artistId} albums={albums} />
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
