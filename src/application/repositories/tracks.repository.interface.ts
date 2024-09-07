import {
  Track,
  TrackWithAlbum,
  TrackWithAlbumAndRatingAvg,
} from "@/src/entities/models/track";

export interface ITracksRepository {
  getTracks(limit?: number): Promise<Track[]>;
  getTrack(trackId: string): Promise<Track | undefined>;
  insertTrack(newTrack: Track): Promise<Track>;

  getTopTracksForArtist(
    artistId: string,
    limit: number,
  ): Promise<TrackWithAlbumAndRatingAvg[]>;

  getFilteredTracks(query: string, limit?: number): Promise<TrackWithAlbum[]>;
  getTracksSearch(offset: number, limit?: number): Promise<Track[]>;
  getTracksCount(): Promise<number>;
  getPopularTracks(limit?: number): Promise<TrackWithAlbum[]>;
  getNewTracks(limit?: number): Promise<TrackWithAlbum[]>;
  getTopTracks(limit?: number): Promise<TrackWithAlbum[]>;

  getTracksForArtist(artistId: string, limit?: number): Promise<Track[]>;
}
