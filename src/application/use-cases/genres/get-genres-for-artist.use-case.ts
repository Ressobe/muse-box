import { container } from "@/di/container";
import { IGenresRepository } from "@/src/application/repositories/genres.repository";
import { Genre } from "@/src/entities/models/genre";

export async function getGenresForArtistUseCase(
  artistId: string,
): Promise<Genre[]> {
  const genresRepository =
    container.get<IGenresRepository>("IGenresRepository");

  const genres = await genresRepository.getGenresForArtist(artistId);

  return genres;
}
