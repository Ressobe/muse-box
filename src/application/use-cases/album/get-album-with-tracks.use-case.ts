import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";

export async function getAlbumWithTracksUseCase(albumId: string) {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const album = albumsRepository.getAlbumWithRelations(albumId);

  return album;
}
