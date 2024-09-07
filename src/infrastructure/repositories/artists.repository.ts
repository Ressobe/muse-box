import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";
import {
  Artist,
  ArtistSelect,
  ArtistWithRatingAvg,
} from "@/src/entities/models/artist";
import { db } from "@/drizzle/database/db";
import { asc, count, desc, eq, sql } from "drizzle-orm";
import { artists, artistsStats } from "@/drizzle/database/schema";

export class ArtistsRepository implements IArtistsRepository {
  async getArtists(): Promise<ArtistSelect[]> {
    return await db.query.artists.findMany();
  }

  async getArtistById(artistId: string): Promise<ArtistSelect | undefined> {
    return await db.query.artists.findFirst({
      where: eq(artists.id, artistId),
    });
  }

  async insertArtist(newArtist: Artist): Promise<ArtistSelect> {
    const [artist] = await db.insert(artists).values(newArtist).returning();
    return artist;
  }

  async getArtistImage(artistId: string): Promise<string | null> {
    const artist = await this.getArtistById(artistId);
    return artist?.image || null;
  }

  async getArtistsSearch(
    offset: number,
    limit?: number,
  ): Promise<ArtistSelect[]> {
    return await db.query.artists.findMany({
      limit,
      offset,
      orderBy: asc(artists.name),
    });
  }

  async getArtistsCount(): Promise<number> {
    const [c] = await db.select({ count: count() }).from(artists);
    return c.count;
  }

  async getFilteredArtists(
    query: string,
    limit?: number,
  ): Promise<ArtistSelect[]> {
    const filteredArtistsQuery = db
      .select()
      .from(artists)
      .where(sql`${artists.name} LIKE ${`%${query}%`} COLLATE NOCASE`);

    if (typeof limit === "number") {
      filteredArtistsQuery.limit(limit);
    }

    const filteredArtists = await filteredArtistsQuery;

    return filteredArtists;
  }

  async getTopArtists(limit?: number): Promise<ArtistWithRatingAvg[]> {
    const topArtistsQuery = db
      .select({
        id: artists.id,
        name: artists.name,
        image: artists.image,
        bio: artists.bio,
        country: artists.country,
        gender: artists.gender,
        type: artists.type,
        ratingAvg: artistsStats.ratingAvg,
      })
      .from(artists)
      .innerJoin(artistsStats, eq(artistsStats.entityId, artists.id))
      .orderBy(desc(artistsStats.ratingAvg));

    if (typeof limit === "number") {
      topArtistsQuery.limit(limit);
    }

    const topArtistsResults = await topArtistsQuery;
    return topArtistsResults;
  }

  async getPopularArtists(limit?: number): Promise<ArtistSelect[]> {
    const popularArtistsQuery = db
      .select({
        id: artists.id,
        name: artists.name,
        image: artists.image,
        bio: artists.bio,
        country: artists.country,
        gender: artists.gender,
        type: artists.type,
      })
      .from(artists)
      .innerJoin(artistsStats, eq(artistsStats.entityId, artists.id))
      .orderBy(desc(artistsStats.ratingCount));

    if (typeof limit === "number") {
      popularArtistsQuery.limit(limit);
    }

    const popularArtistsResults = await popularArtistsQuery;
    return popularArtistsResults;
  }

  async getNewArtists(limit?: number): Promise<ArtistSelect[]> {
    const newArtistsQuery = db
      .select({
        id: artists.id,
        name: artists.name,
        image: artists.image,
        bio: artists.bio,
        country: artists.country,
        beginDateYear: artists.beginDateYear,
        gender: artists.gender,
        type: artists.type,
      })
      .from(artists)
      .orderBy(desc(artists.beginDateYear));

    if (typeof limit === "number") {
      newArtistsQuery.limit(limit);
    }

    const newArtistsResults = await newArtistsQuery;
    return newArtistsResults;
  }
}
