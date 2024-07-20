import { getArtistReviewsUseCase, getArtistUseCase } from "@/use-cases/artist";
import { notFound } from "next/navigation";
import { TopTracks } from "@/components/top-tracks";
import { Albums } from "@/components/albums";
import { SingleEps } from "@/components/single-eps";
import { Reviews } from "@/components/reviews";
import { ArtistHeader } from "@/components/artist-header";
import { getUserArtistReview } from "@/data-access/user";
import { auth } from "@/auth";

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

  const reviews = await getArtistReviewsUseCase(artist.id);

  let showAddReview = true;
  const session = await auth();
  if (session && session.user.id) {
    const review = await getUserArtistReview(session.user.id, artist.id);
    showAddReview = !review;
  }

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
