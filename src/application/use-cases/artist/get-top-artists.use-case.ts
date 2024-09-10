import { container } from "@/di/container";
import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";

export async function getTopArtistsUseCase() {
  const artistsRepository =
    container.get<IArtistsRepository>("IArtistsRepository");

  const topArtists = await artistsRepository.getTopArtists(5);

  return topArtists;
}
