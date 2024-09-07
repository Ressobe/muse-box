import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";

export async function getTopAlbumsUseCase() {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const topAlbums = albumsRepository.getTopAlbums(10);

  return topAlbums;
}
