import { container } from "@/di/container";
import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";
import { ArtistSelect } from "@/src/entities/models/artist";

export async function getFilteredArtistsUseCase(
  query: string,
): Promise<ArtistSelect[]> {
  const artistsRepository =
    container.get<IArtistsRepository>("IArtistsRepository");

  const artists = await artistsRepository.getFilteredArtists(
    query.toLowerCase(),
    10,
  );

  return artists;
}
