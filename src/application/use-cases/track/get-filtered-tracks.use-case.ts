import { container } from "@/di/container";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";
import { TrackWithAlbum } from "@/src/entities/models/track";

export async function getFilteredTracksUseCase(
  query: string,
): Promise<TrackWithAlbum[]> {
  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const tracks = await tracksRepository.getFilteredTracks(
    query.toLowerCase(),
    10,
  );

  return tracks;
}
