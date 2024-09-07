import { Genre } from "@/src/entities/models/genre";

export interface IGenresRepository {
  getGenresForArtist(artistId: string): Promise<Genre[]>;
}
