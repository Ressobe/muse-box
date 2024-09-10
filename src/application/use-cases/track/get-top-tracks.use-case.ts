import { container } from "@/di/container";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";
import { TrackWithAlbumAndRatingAvg } from "@/src/entities/models/track";

export async function getTopTracksUseCase(
  artistId: string,
): Promise<TrackWithAlbumAndRatingAvg[]> {
  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const topTracks = tracksRepository.getTopTracksForArtist(artistId, 5);

  return topTracks;
}
