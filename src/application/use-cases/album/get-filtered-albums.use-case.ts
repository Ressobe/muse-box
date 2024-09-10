import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";
import { Album } from "@/src/entities/models/album";

export async function getFilteredAlbumsUseCase(
  query: string,
): Promise<Album[]> {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const albums = await albumsRepository.getFilteredAlbums(
    query.toLowerCase(),
    10,
  );

  return albums;
}
