import { Stat } from "@/src/entities/models/stat";

export interface IStatsRepository {
  insertArtistStat(artistId: string): Promise<Stat>;
  insertAlbumStat(albumId: string): Promise<Stat>;
  insertTrackStat(albumId: string): Promise<Stat>;
  getArtistStat(artistId: string): Promise<Stat>;
}
