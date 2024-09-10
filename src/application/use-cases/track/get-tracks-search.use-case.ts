import { container } from "@/di/container";
import { SortType } from "@/src/entities/types";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";

export async function getTracksSearchUseCase(
  currentPage: number,
  totalItemsOnPage: number,
  sort: SortType,
) {
  const offset = (currentPage - 1) * totalItemsOnPage;
  const limit = totalItemsOnPage;

  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const tracks = await tracksRepository.getTracksSearch(offset, limit);

  const totalCount = await tracksRepository.getTracksCount();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    tracks,
    totalPages,
  };
}
