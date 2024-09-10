import { container } from "@/di/container";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";

export async function getNewTracksUseCase() {
  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const newTracks = tracksRepository.getNewTracks(10);

  return newTracks;
}
