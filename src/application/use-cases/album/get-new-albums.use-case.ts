import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";

export async function getNewAlbumsUseCase() {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const newAlbums = albumsRepository.getNewAlbums(10);

  return newAlbums;
}
