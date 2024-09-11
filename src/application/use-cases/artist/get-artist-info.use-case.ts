import { container } from "@/di/container";
import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";

export async function getArtistInfoUseCase(artistId: string) {
  const artistsRepository =
    container.get<IArtistsRepository>("IArtistsRepository");

  const artist = artistsRepository.getArtistWithStats(artistId);

  return artist;
}
