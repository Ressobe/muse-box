import { container } from "@/di/container";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";

export async function getTopTracksUseCase() {
  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const topTracks = tracksRepository.getTopTracks(10);

  return topTracks;
}
