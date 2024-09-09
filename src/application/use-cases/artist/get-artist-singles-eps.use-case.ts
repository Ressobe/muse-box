import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";

export async function getArtistSinglesEpsUseCase(artistId: string) {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const singlesEps = albumsRepository.getSinglesEpsForArtist(artistId, 5);

  return singlesEps;
}
