import { Playlist, PlaylistItem } from "@/src/entities/models/playlist";

export interface IPlaylistsRepository {
  insertPlaylist(userId: string, name: string): Promise<Playlist>;
  getPlaylist(playlistId: string): Promise<Playlist>;
  getPlaylistByUserIdAndName(userId: string, name: string): Promise<Playlist>;

  getItemFromPlaylist(
    playlistId: string,
    itemId: string,
  ): Promise<PlaylistItem | undefined>;
}
