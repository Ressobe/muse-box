import { container } from "@/di/container";
import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";

export async function getPopularArtistsUseCase() {
  const artistsRepository =
    container.get<IArtistsRepository>("IArtistsRepository");

  const popularArtists = artistsRepository.getPopularArtists();

  return popularArtists;
}
