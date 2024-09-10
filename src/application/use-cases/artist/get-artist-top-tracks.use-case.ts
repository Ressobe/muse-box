import { container } from "@/di/container";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";

export async function getArtistTopTracksUseCase(artistId: string) {
  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const topTracks = tracksRepository.getTopTracksForArtist(artistId, 5);

  return topTracks;
}
