import {
  Playlist,
  PlaylistItem,
  PlaylistWithItems,
} from "@/src/entities/models/playlist";

export interface IPlaylistsRepository {
  insertPlaylist(userId: string, name: string): Promise<Playlist>;
  getPlaylist(playlistId: string): Promise<Playlist | undefined>;
  getPlaylistByNameForUser(
    userId: string,
    name: string,
  ): Promise<Playlist | undefined>;

  getItemFromPlaylist(
    playlistId: string,
    itemId: string,
  ): Promise<PlaylistItem | undefined>;

  getPlaylistsForUser(userId: string): Promise<PlaylistWithItems[]>;
}
