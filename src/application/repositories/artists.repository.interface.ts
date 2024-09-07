import {
  Artist,
  ArtistSelect,
  ArtistWithRatingAvg,
} from "@/src/entities/models/artist";

export interface IArtistsRepository {
  getArtists(): Promise<ArtistSelect[]>;
  getArtistById(artistId: string): Promise<ArtistSelect | undefined>;
  insertArtist(newArtist: Artist): Promise<ArtistSelect>;
  getArtistImage(artistId: string): Promise<string | null>;
  getArtistsSearch(offset: number, limit?: number): Promise<ArtistSelect[]>;
  getArtistsCount(): Promise<number>;
  getFilteredArtists(query: string, limit?: number): Promise<ArtistSelect[]>;
  getTopArtists(limit?: number): Promise<ArtistWithRatingAvg[]>;
  getPopularArtists(limit?: number): Promise<ArtistSelect[]>;
  getNewArtists(limit?: number): Promise<ArtistSelect[]>;
}
