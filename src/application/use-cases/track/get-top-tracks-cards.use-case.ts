import { container } from "@/di/container";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";

export async function getTopTracksCardsUseCase() {
  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const tracks = await tracksRepository.getTopTracks(5);

  return tracks;
}
