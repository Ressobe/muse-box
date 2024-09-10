import { container } from "@/di/container";
import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";

export async function getNewArtistsUseCase() {
  const artistsRepository =
    container.get<IArtistsRepository>("IArtistsRepository");

  const newArtists = artistsRepository.getNewArtists(5);

  return newArtists;
}
