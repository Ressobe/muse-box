import { container } from "@/di/container";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";

export async function getPopularTracksUseCase() {
  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const popularTracks = tracksRepository.getPopularTracks(10);

  return popularTracks;
}
