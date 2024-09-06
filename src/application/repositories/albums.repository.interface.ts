import { Album } from "@/src/entities/models/album";

export interface IAlbumsRepository {
  getAlbum(albumId: string): Promise<Album>;
  insertAlbum(newAlbum: Album): Promise<Album>;
  getAlbumsByArtistId(artistId: string, limit?: number): Promise<Album[]>;
  getAlbumsSearch(offset: number, limit?: number): Promise<Album[]>;

  getAlbumsSortedByHighestRating(
    offset: number,
    limit?: number,
  ): Promise<Album[]>;

  getAlbumsSortedByLowestRating(
    offset: number,
    limit?: number,
  ): Promise<Album[]>;

  getAlbumsSortedAlphabetically(
    offset: number,
    limit?: number,
  ): Promise<Album[]>;

  getAlbumsSortedInReverseAlphabetical(
    offset: number,
    limit?: number,
  ): Promise<Album>;

  getAlbumsCount(): Promise<number>;
}
