import { IGenresRepository } from "@/src/application/repositories/genres.repository";
import { Genre } from "@/src/entities/models/genre";
import { db } from "@/drizzle/database/db";
import { eq } from "drizzle-orm";
import { genres, genresToArtists } from "@/drizzle/database/schema";

export class GenresRepository implements IGenresRepository {
  async getGenresForArtist(artistId: string): Promise<Genre[]> {
    const query = db
      .select({
        id: genres.id,
        name: genres.name,
      })
      .from(genresToArtists)
      .innerJoin(genres, eq(genresToArtists.genreId, genres.id))
      .where(eq(genresToArtists.artistId, artistId));

    return await query;
  }
}
