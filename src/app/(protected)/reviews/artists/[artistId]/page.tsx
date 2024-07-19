import { auth } from "@/auth";
import { ArtistHeader } from "@/components/artist-header";
import { Reviews } from "@/components/reviews";
import { getUserArtistReview } from "@/data-access/user";
import { getArtistReviewsUseCase, getArtistUseCase } from "@/use-cases/artist";
import { notFound } from "next/navigation";

export default async function ArtistReviewsPage({
  params,
}: {
  params: { artistId: string };
}) {
  const { artistId } = params;
  const artist = await getArtistUseCase(artistId);
  if (!artist) {
    notFound();
  }

  const reviews = await getArtistReviewsUseCase(artist.id);
  let showAddReview = true;
  const session = await auth();
  if (session && session.user.id) {
    const review = await getUserArtistReview(session.user.id, artist.id);
    showAddReview = !review;
  }

  // TODO: Lazy loading of more reviews

  return (
    <section className="space-y-12">
      <ArtistHeader artistId={artistId} />
      <h2 className="font-bold text-4xl">Reviews</h2>
      <Reviews
        reviews={reviews}
        showAddReview={showAddReview}
        type="artist"
        entityId={artistId}
      />
    </section>
  );
}
