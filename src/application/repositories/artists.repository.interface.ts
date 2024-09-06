import { Artist } from "@/src/entities/models/artist";

export interface IArtistsRepository {
  getArtists(): Promise<Artist[]>;
  getArtistById(artistId: string): Promise<Artist>;
  insertArtist(newArtist: Artist): Promise<Artist>;
  getArtistImage(artistId: string): Promise<string | null>;
  getArtistsSearch(offset: number, limit?: number): Promise<Artist[]>;
  getArtistsCount(): Promise<number>;
  getFilteredArtists(query: string, limit?: number): Promise<Artist[]>;
  getTopArtists(limit?: number): Promise<Artist[]>;
  getPopularArtists(limit?: number): Promise<Artist[]>;
  getNewArtists(limit?: number): Promise<Artist[]>;
}
