import {
  Track,
  TrackWithAlbum,
  TrackWithAlbumAndRatingAvg,
  TrackWithAlbumAndStats,
} from "@/src/entities/models/track";

export interface ITracksRepository {
  getTracks(limit?: number): Promise<Track[]>;
  getTrack(trackId: string): Promise<Track | undefined>;
  insertTrack(newTrack: Track): Promise<Track>;

  getTopTracksForArtist(
    artistId: string,
    limit: number,
  ): Promise<TrackWithAlbumAndRatingAvg[]>;

  getTracksForArtist(artistId: string, limit?: number): Promise<Track[]>;

  getFilteredTracks(query: string, limit?: number): Promise<TrackWithAlbum[]>;

  getTracksSearch(
    offset: number,
    limit?: number,
  ): Promise<TrackWithAlbumAndStats[]>;

  getTracksSortedByHighestRating(
    offset: number,
    limit?: number,
  ): Promise<TrackWithAlbumAndStats[]>;

  getTracksSortedByLowestRating(
    offset: number,
    limit?: number,
  ): Promise<TrackWithAlbumAndStats[]>;

  getTracksSortedAlphabetically(
    offset: number,
    limit?: number,
  ): Promise<TrackWithAlbumAndStats[]>;

  getTracksSortedInReverseAlphabetical(
    offset: number,
    limit?: number,
  ): Promise<TrackWithAlbumAndStats[]>;

  getTracksCount(): Promise<number>;
  getPopularTracks(limit?: number): Promise<TrackWithAlbum[]>;
  getNewTracks(limit?: number): Promise<TrackWithAlbum[]>;
  getTopTracks(limit?: number): Promise<TrackWithAlbumAndStats[]>;
}