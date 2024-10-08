import { container } from "@/di/container";
import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";
import { ArtistSelect } from "@/src/entities/models/artist";

export async function getArtistUseCase(
  artistId: string,
): Promise<ArtistSelect | undefined> {
  const artistsRepository =
    container.get<IArtistsRepository>("IArtistsRepository");

  const artist = await artistsRepository.getArtist(artistId);

  return artist;
}
