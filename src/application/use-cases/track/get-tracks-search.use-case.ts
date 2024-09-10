import { container } from "@/di/container";
import { SortType } from "@/src/entities/types";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";
import { TrackWithAlbumAndStats } from "@/src/entities/models/track";

export async function getTracksSearchUseCase(
  currentPage: number,
  totalItemsOnPage: number,
  sort: SortType,
) {
  const offset = (currentPage - 1) * totalItemsOnPage;
  const limit = totalItemsOnPage;

  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const sortMethods: Record<
    typeof sort,
    () => Promise<TrackWithAlbumAndStats[]>
  > = {
    default: () => tracksRepository.getTracksSearch(offset, limit),
    highestRating: () =>
      tracksRepository.getTracksSortedByHighestRating(offset, limit),
    lowestRating: () =>
      tracksRepository.getTracksSortedByLowestRating(offset, limit),
    alphabetical: () =>
      tracksRepository.getTracksSortedAlphabetically(offset, limit),
    alphabeticalReverse: () =>
      tracksRepository.getTracksSortedInReverseAlphabetical(offset, limit),
  };

  const tracks = await sortMethods[sort]();

  const totalCount = await tracksRepository.getTracksCount();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    tracks,
    totalPages,
  };
}
