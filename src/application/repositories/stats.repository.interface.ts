import { Stat } from "@/src/entities/models/stat";

export interface IStatsRepository {
  insertArtistStat(artistId: string): Promise<Stat>;
  insertAlbumStat(albumId: string): Promise<Stat>;
  insertTrackStat(trackId: string): Promise<Stat>;
  getStatsForArtist(artistId: string): Promise<Stat | undefined>;
}
