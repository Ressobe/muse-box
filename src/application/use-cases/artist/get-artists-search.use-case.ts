import { container } from "@/di/container";
import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";
import { ArtistWithStats } from "@/src/entities/models/artist";
import { SortType } from "@/src/entities/types";

export async function getArtistsSearchUseCase(
  currentPage: number,
  totalItemsOnPage: number,
  sort: SortType,
): Promise<{ artists: ArtistWithStats[]; totalPages: number }> {
  const artistsRepository =
    container.get<IArtistsRepository>("IArtistsRepository");

  const offset = (currentPage - 1) * totalItemsOnPage;
  const limit = totalItemsOnPage;

  const sortMethods: Record<typeof sort, () => Promise<ArtistWithStats[]>> = {
    default: () => artistsRepository.getArtistsSearch(offset, limit),
    highestRating: () =>
      artistsRepository.getArtistsSortedByHighestRating(offset, limit),
    lowestRating: () =>
      artistsRepository.getArtistsSortedByLowestRating(offset, limit),
    alphabetical: () =>
      artistsRepository.getArtistsSortedAlphabetically(offset, limit),
    alphabeticalReverse: () =>
      artistsRepository.getArtistsSortedInReverseAlphabetical(offset, limit),
  };

  const artists = await sortMethods[sort]();

  const totalCount = await artistsRepository.getArtistsCount();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    artists,
    totalPages,
  };
}
