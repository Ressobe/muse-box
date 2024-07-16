import { ArtistHeader } from "@/components/artist-header";
import { Comment } from "@/components/comment";
import {
  getArtistGenresUseCase,
  getArtistReviewsUseCase,
  getArtistUseCase,
} from "@/use-cases/artist";
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

  const genres = await getArtistGenresUseCase(artist.id);
  const reviews = await getArtistReviewsUseCase(artist.id);

  // TODO: Lazy loading of more reviews

  return (
    <section className="space-y-12">
      <ArtistHeader artist={artist} genres={genres} />
      <h2 className="font-bold text-4xl">Reviews</h2>
      <ul className="w-full grid grid-cols-2 gap-x-10">
        {reviews.map((item) => {
          return <Comment key={item.id} review={item} />;
        })}
      </ul>
    </section>
  );
}
