import { playlistItems, playlists } from "@/drizzle/database/schema";
import { IPlaylistsRepository } from "@/src/application/repositories/playlists.repository.interface";
import { db } from "@/drizzle/database/db";
import {
  Playlist,
  PlaylistItem,
  PlaylistWithItems,
} from "@/src/entities/models/playlist";
import { and, eq } from "drizzle-orm";

export class PlaylistsRepository implements IPlaylistsRepository {
  async insertPlaylist(userId: string, name: string): Promise<Playlist> {
    const [playlist] = await db
      .insert(playlists)
      .values({
        userId,
        name,
      })
      .returning();

    return playlist;
  }

  async getPlaylist(playlistId: string): Promise<Playlist | undefined> {
    return await db.query.playlists.findFirst({
      where: eq(playlists.id, playlistId),
    });
  }

  async getPlaylistByNameForUser(
    userId: string,
    name: string,
  ): Promise<Playlist | undefined> {
    return await db.query.playlists.findFirst({
      where: and(eq(playlists.name, name), eq(playlists.userId, userId)),
    });
  }

  async getItemFromPlaylist(
    playlistId: string,
    itemId: string,
  ): Promise<PlaylistItem | undefined> {
    return await db.query.playlistItems.findFirst({
      where: and(
        eq(playlistItems.playlistId, playlistId),
        eq(playlistItems.itemId, itemId),
      ),
    });
  }

  async getPlaylistsForUser(userId: string): Promise<PlaylistWithItems[]> {
    return await db.query.playlists.findMany({
      where: eq(playlists.userId, userId),
      with: {
        items: true,
      },
    });
  }
}
