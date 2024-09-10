import { container } from "@/di/container";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";

export async function getArtistDiscographyUseCase(artistId: string) {
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const albums = await albumsRepository.getAlbumsWithTracksForArtist(artistId);
  const singlesEps =
    await albumsRepository.getSinglesEpsWithTracksForArtist(artistId);

  return [...albums, ...singlesEps];
}
