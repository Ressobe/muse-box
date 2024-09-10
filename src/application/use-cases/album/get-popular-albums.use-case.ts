import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";

export async function getPopularAlbumsUseCase() {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const popularAlbums = albumsRepository.getPopularAlbums(10);

  return popularAlbums;
}