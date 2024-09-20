import { getArtistAlbumsUseCase } from "@/src/application/use-cases/artist/get-artist-albums.use-case";
import { Album } from "@/src/entities/models/album";

export async function getArtistAlbumsController(
  artistId: string,
): Promise<Album[]> {
  const albums = await getArtistAlbumsUseCase(artistId);
  return albums;
}
