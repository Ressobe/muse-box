import { container } from "@/di/container";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";
import { TrackWithRelations } from "@/src/entities/models/track";

export async function getTrackInfoUseCase(
  trackId: string,
): Promise<TrackWithRelations | undefined> {
  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const trackInfo = await tracksRepository.getTrackInfo(trackId);

  return trackInfo;
}
