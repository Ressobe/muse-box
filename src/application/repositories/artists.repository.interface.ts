import {
  Artist,
  ArtistSelect,
  ArtistWithStats,
} from "@/src/entities/models/artist";

export interface IArtistsRepository {
  getArtist(artistId: string): Promise<ArtistSelect | undefined>;
  getArtists(): Promise<ArtistSelect[]>;
  getArtistWithStats(artistId: string): Promise<ArtistWithStats | undefined>;
  insertArtist(newArtist: Artist): Promise<ArtistSelect>;
  getArtistImage(artistId: string): Promise<string | null>;
  getArtistsCount(): Promise<number>;
  getFilteredArtists(query: string, limit?: number): Promise<ArtistSelect[]>;
  getTopArtists(limit?: number): Promise<ArtistWithStats[]>;
  getPopularArtists(limit?: number): Promise<ArtistSelect[]>;
  getNewArtists(limit?: number): Promise<ArtistSelect[]>;

  getArtistsSearch(offset: number, limit?: number): Promise<ArtistWithStats[]>;

  getArtistsSortedByHighestRating(
    offset: number,
    limit?: number,
  ): Promise<ArtistWithStats[]>;

  getArtistsSortedByLowestRating(
    offset: number,
    limit?: number,
  ): Promise<ArtistWithStats[]>;

  getArtistsSortedAlphabetically(
    offset: number,
    limit?: number,
  ): Promise<ArtistWithStats[]>;

  getArtistsSortedInReverseAlphabetical(
    offset: number,
    limit?: number,
  ): Promise<ArtistWithStats[]>;
}
