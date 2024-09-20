import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";
import { Album } from "@/src/entities/models/album";

export async function getArtistAlbumsUseCase(
  artistId: string,
): Promise<Album[]> {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const artistAlbums = albumsRepository.getAlbumsForArtist(artistId, 5);

  return artistAlbums;
}
