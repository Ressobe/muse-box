import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";
import { Album } from "@/src/entities/models/album";

export async function getAlbumUseCase(
  albumId: string,
): Promise<Album | undefined> {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const album = albumsRepository.getAlbum(albumId);

  return album;
}
