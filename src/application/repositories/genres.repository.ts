import { Genre } from "@/src/entities/models/genre";

export interface IGenresRepository {
  getGenresByArtistId(artistId: string): Promise<Genre[]>;
}
