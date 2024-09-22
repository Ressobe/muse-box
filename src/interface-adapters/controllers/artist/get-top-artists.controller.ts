import { getTopArtistsUseCase } from "@/src/application/use-cases/artist/get-top-artists.use-case";

export async function getTopArtistsController() {
  const artists = await getTopArtistsUseCase();
  return artists;
}
