import {
  Artist,
  ArtistSelect,
  ArtistWithStats,
} from "@/src/entities/models/artist";

export interface IArtistsRepository {
  getArtists(): Promise<ArtistSelect[]>;
  getArtist(artistId: string): Promise<ArtistWithStats | undefined>;
  insertArtist(newArtist: Artist): Promise<ArtistSelect>;
  getArtistImage(artistId: string): Promise<string | null>;
  getArtistsSearch(offset: number, limit?: number): Promise<ArtistSelect[]>;
  getArtistsCount(): Promise<number>;
  getFilteredArtists(query: string, limit?: number): Promise<ArtistSelect[]>;
  getTopArtists(limit?: number): Promise<ArtistWithStats[]>;
  getPopularArtists(limit?: number): Promise<ArtistSelect[]>;
  getNewArtists(limit?: number): Promise<ArtistSelect[]>;
}
