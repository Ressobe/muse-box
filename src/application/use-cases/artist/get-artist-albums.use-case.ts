import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";

export async function getArtistAlbumsUseCase(artistId: string) {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const artistAlbums = albumsRepository.getAlbumsForArtist(artistId, 5);

  return artistAlbums;
}
