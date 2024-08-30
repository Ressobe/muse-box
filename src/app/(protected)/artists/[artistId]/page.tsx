import { getArtistReviewsUseCase, getArtistUseCase } from "@/use-cases/artist";
import { notFound } from "next/navigation";
import { TopTracks } from "@/components/track/top-tracks";
import { Albums } from "@/components/album/albums";
import { SingleEps } from "@/components/album/single-eps";
import { Reviews } from "@/components/review/reviews";
import { ArtistHeader } from "@/components/artist/artist-header";
import { currentUser } from "@/lib/auth";
import { shouldShowAddReviewUseCase } from "@/use-cases/review";

export default async function Artist({
  params,
}: {
  params: { artistId: string };
}) {
  const { artistId } = params;

  const artist = await getArtistUseCase(artistId);
  if (!artist) {
    return notFound();
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }
  const reviews = await getArtistReviewsUseCase(artist.id, user.id);
  const showAddReview = await shouldShowAddReviewUseCase(artist.id, "artist");

  return (
    <section className="space-y-12">
      <ArtistHeader artistId={artistId} />
      <TopTracks artistId={artistId} />
      <Albums artistId={artistId} />
      <SingleEps artistId={artistId} />
      <Reviews
        reviews={reviews}
        showAddReview={showAddReview}
        type="artist"
        entityId={artistId}
        entityName={artist.name}
      />
    </section>
  );
}
