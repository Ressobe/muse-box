import { container } from "@/di/container";
import { SortType } from "@/src/entities/types";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";
import { AlbumWithStats } from "@/src/entities/models/album";

export async function getAlbumsSearchUseCase(
  currentPage: number,
  totalItemsOnPage: number,
  sort: SortType,
) {
  const offset = (currentPage - 1) * totalItemsOnPage;
  const limit = totalItemsOnPage;

  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");

  const sortMethods: Record<typeof sort, () => Promise<AlbumWithStats[]>> = {
    default: () => albumsRepository.getAlbumsSearch(offset, limit),
    highestRating: () =>
      albumsRepository.getAlbumsSortedByHighestRating(offset, limit),
    lowestRating: () =>
      albumsRepository.getAlbumsSortedByLowestRating(offset, limit),
    alphabetical: () =>
      albumsRepository.getAlbumsSortedAlphabetically(offset, limit),
    alphabeticalReverse: () =>
      albumsRepository.getAlbumsSortedInReverseAlphabetical(offset, limit),
  };

  const totalCount = await albumsRepository.getAlbumsCount();
  const totalPages = Math.ceil(totalCount / limit);

  const albums = await sortMethods[sort]();

  return {
    albums,
    totalPages,
  };
}
