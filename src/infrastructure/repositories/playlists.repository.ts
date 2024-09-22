import {
  playlistItems,
  PlaylistItemType,
  playlists,
} from "@/drizzle/database/schemas";
import { IPlaylistsRepository } from "@/src/application/repositories/playlists.repository.interface";
import { db } from "@/drizzle/database/db";
import {
  Playlist,
  PlaylistItem,
  PlaylistWithItems,
} from "@/src/entities/models/playlist";
import { and, eq } from "drizzle-orm";
import { Content } from "@/src/entities/models/content";

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

  async getPlaylistInfo(
    playlistId: string,
  ): Promise<PlaylistWithItems | undefined> {
    return await db.query.playlists.findFirst({
      where: eq(playlists.id, playlistId),
      with: {
        items: true,
      },
    });
  }

  async addItemToPlaylist(
    entityId: string,
    type: Content,
    playlistId: string,
  ): Promise<PlaylistItem> {
    let itemType = "";
    if (type === "album") {
      itemType = PlaylistItemType.ALBUM;
    }
    if (type === "artist") {
      itemType = PlaylistItemType.ARTIST;
    }

    if (type === "track") {
      itemType = PlaylistItemType.TRACK;
    }

    const [item] = await db
      .insert(playlistItems)
      .values({
        playlistId: playlistId,
        itemId: entityId,
        itemType: itemType,
      })
      .returning();
    return item;
  }

  async deleteItemFromPlaylist(
    entityId: string,
    type: Content,
    playlistId: string,
  ): Promise<PlaylistItem> {
    let itemType = "";
    if (type === "album") {
      itemType = PlaylistItemType.ALBUM;
    }
    if (type === "artist") {
      itemType = PlaylistItemType.ARTIST;
    }

    if (type === "track") {
      itemType = PlaylistItemType.TRACK;
    }

    const [item] = await db
      .delete(playlistItems)
      .where(
        and(
          eq(playlistItems.itemId, entityId),
          eq(playlistItems.playlistId, playlistId),
        ),
      )
      .returning();
    return item;
  }
}
