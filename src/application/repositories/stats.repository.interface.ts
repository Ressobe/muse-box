import { Content } from "@/src/entities/models/content";
import { Stat } from "@/src/entities/models/stat";

export interface IStatsRepository {
  insertArtistStat(artistId: string): Promise<Stat>;
  insertAlbumStat(albumId: string): Promise<Stat>;
  insertTrackStat(trackId: string): Promise<Stat>;

  getStatsForArtist(artistId: string): Promise<Stat | undefined>;
  getStatsForAlbum(albumId: string): Promise<Stat | undefined>;
  getStatsForTrack(trackId: string): Promise<Stat | undefined>;

  getStats(entityId: string, type: Content): Promise<Stat | undefined>;

  updateStats(
    entityId: string,
    type: Content,
    newRatingSum: number,
    newReviewCount: number,
    newAvgRating: number,
  ): Promise<void>;
}
