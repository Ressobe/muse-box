import { container } from "@/di/container";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";
import { Track } from "@/src/entities/models/track";

export async function getTrackUseCase(
  trackId: string,
): Promise<Track | undefined> {
  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const track = tracksRepository.getTrack(trackId);

  return track;
}
