import { getArtistReviewsUseCase, getArtistUseCase } from "@/use-cases/artist";
import { notFound } from "next/navigation";
import { TopTracks } from "@/components/top-tracks";
import { Albums } from "@/components/albums";
import { SingleEps } from "@/components/single-eps";
import { Reviews } from "@/components/reviews";
import { ArtistHeader } from "@/components/artist-header";
import { getUserArtistReview } from "@/data-access/user";
import { auth } from "@/auth";
import { currentUser } from "@/lib/auth";
import { shouldShowAddReview } from "@/lib/utils";

export default async function Artist({
  params,
}: {
  params: { artistId: string };
}) {
  const { artistId } = params;

  const artist = await getArtistUseCase(artistId);
  if (!artist) {
    notFound();
  }

  const user = await currentUser();
  if (!user) {
    return null;
  }
  const reviews = await getArtistReviewsUseCase(artist.id, user.id);
  const showAddReview = await shouldShowAddReview(artist.id);

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
      />
    </section>
  );
}
