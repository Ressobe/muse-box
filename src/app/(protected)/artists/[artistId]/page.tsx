import {
  getArtistAlbumsUseCase,
  getArtistGenresUseCase,
  getArtistReviewsUseCase,
  getArtistSingleEpsUseCase,
  getArtistTopTracksUseCase,
  getArtistUseCase,
} from "@/use-cases/artist";
import { notFound } from "next/navigation";
import { TopTracks } from "@/components/top-tracks";
import { Albums } from "@/components/albums";
import { SingleEps } from "@/components/single-eps";
import { Reviews } from "@/components/reviews";
import { ArtistHeader } from "@/components/artist-header";

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

  const albums = await getArtistAlbumsUseCase(artist.id);
  const singleEps = await getArtistSingleEpsUseCase(artist.id);
  const reviews = await getArtistReviewsUseCase(artist.id);
  const topTracks = await getArtistTopTracksUseCase(artist.id);
  const genres = await getArtistGenresUseCase(artist.id);

  return (
    <section className="space-y-12">
      <ArtistHeader name={artist.name} genres={genres} />
      <TopTracks tracks={topTracks} />
      <Albums artistId={artistId} albums={albums} />
      <SingleEps artistId={artistId} singleEps={singleEps} />
      <Reviews artistId={artistId} reviews={reviews} />
    </section>
  );
}
