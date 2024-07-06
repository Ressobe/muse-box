import { getArtistUseCase } from "@/use-cases/artist";
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

  return (
    <section className="space-y-12">
      <ArtistHeader name={artist.name} />
      <TopTracks />
      <Albums artistId={artistId} />
      <SingleEps artistId={artistId} />
      <Reviews artistId={artistId} />
    </section>
  );
}
