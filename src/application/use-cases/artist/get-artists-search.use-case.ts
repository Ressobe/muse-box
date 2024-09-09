import { container } from "@/di/container";
import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";
import { ArtistSelect } from "@/src/entities/models/artist";

export async function getArtistsSearchUseCase(
  currentPage: number,
  totalItemsOnPage: number,
): Promise<{ artists: ArtistSelect[]; totalPages: number }> {
  const artistsRepository =
    container.get<IArtistsRepository>("IArtistsRepository");

  const offset = (currentPage - 1) * totalItemsOnPage;
  const limit = totalItemsOnPage;

  const artists = await artistsRepository.getArtistsSearch(offset, limit);

  const totalCount = await artistsRepository.getArtistsCount();
  const totalPages = Math.ceil(totalCount / limit);

  return {
    artists,
    totalPages,
  };
}
