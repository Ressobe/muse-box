import { Track } from "@/src/entities/models/track";

// TODO: Return types
//
export interface ITracksInterface {
  getTracks(limit?: number): Promise<Track[]>;
  getTrack(trackId: string): Promise<Track>;
  insertTrack(newTrack: Track): Promise<Track>;
  getTrackImage(trackId: string): Promise<string | null>;
  getTopTracksForArtist(artistId: string, limit: number): Promise<Track[]>;
  getFilteredTracks(query: string, limit?: number): Promise<Track[]>;
  getTracksSearch(offset: number, limit?: number): Promise<Track[]>;
  getTracksCount(): Promise<number>;
  getPopularTracks(limit?: number): Promise<number>;
  getNewTracks(limit?: number): Promise<number>;
  getTracksByArtistId(artistId: string, limit?: number): Promise<Track[]>;
}
