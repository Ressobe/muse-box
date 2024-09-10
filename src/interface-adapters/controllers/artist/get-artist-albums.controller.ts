import { getArtistAlbumsUseCase } from "@/src/application/use-cases/artist/get-artist-albums.use-case";

export async function getArtistAlbumsController(artistId: string) {
  const albums = await getArtistAlbumsUseCase(artistId);

  return albums;
}
