import {
  Album,
  AlbumWithRatingAvg,
  AlbumWithStats,
  AlbumWithTracks,
} from "@/src/entities/models/album";

export interface IAlbumsRepository {
  getAlbum(albumId: string): Promise<Album | undefined>;

  getAlbumWithRelations(albumId: string): Promise<AlbumWithTracks | undefined>;

  insertAlbum(newAlbum: Album): Promise<Album>;
  getAlbumsSearch(offset: number, limit?: number): Promise<AlbumWithStats[]>;

  getAlbumsSortedByHighestRating(
    offset: number,
    limit?: number,
  ): Promise<AlbumWithStats[]>;

  getAlbumsSortedByLowestRating(
    offset: number,
    limit?: number,
  ): Promise<AlbumWithStats[]>;

  getAlbumsSortedAlphabetically(
    offset: number,
    limit?: number,
  ): Promise<AlbumWithStats[]>;

  getAlbumsSortedInReverseAlphabetical(
    offset: number,
    limit?: number,
  ): Promise<AlbumWithStats[]>;

  getAlbumsCount(): Promise<number>;
  getAlbumsForArtist(artistId: string, limit?: number): Promise<Album[]>;
  getSinglesEpsForArtist(artistId: string, limit?: number): Promise<Album[]>;

  getAlbumsWithTracksForArtist(
    artistId: string,
    limit?: number,
  ): Promise<AlbumWithTracks[]>;

  getSinglesEpsWithTracksForArtist(
    artistId: string,
    limit?: number,
  ): Promise<AlbumWithTracks[]>;

  getPopularAlbums(limit?: number): Promise<Album[]>;
  getNewAlbums(limit?: number): Promise<Album[]>;
  getTopAlbums(limit?: number): Promise<AlbumWithStats[]>;

  getFilteredAlbums(query: string, limit?: number): Promise<Album[]>;
}
