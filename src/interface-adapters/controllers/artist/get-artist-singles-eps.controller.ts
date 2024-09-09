import { getArtistSinglesEpsUseCase } from "@/src/application/use-cases/artist/get-artist-singles-eps.use-case";

export async function getArtistSinglesEpsController(artistId: string) {
  const singlesEps = await getArtistSinglesEpsUseCase(artistId);

  return singlesEps;
}
