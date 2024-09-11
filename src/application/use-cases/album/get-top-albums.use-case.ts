import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";
import { AlbumWithStats } from "@/src/entities/models/album";

export async function getTopAlbumsUseCase(): Promise<AlbumWithStats[]> {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const topAlbums = albumsRepository.getTopAlbums(10);

  return topAlbums;
}
