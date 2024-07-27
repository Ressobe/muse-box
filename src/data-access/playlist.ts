import { db } from "@/database/db";
import { playlistItems, playlists } from "@/database/schema";
import { Entity } from "@/types";
import { and, eq } from "drizzle-orm";
import { PlaylistItemType } from "@/database/schema";

export async function createPlaylist(userId: string, name: string) {
  const [playlist] = await db
    .insert(playlists)
    .values({
      userId,
      name,
    })
    .returning();

  return playlist;
}

export async function getPlaylistById(playlistId: string) {
  return await db.query.playlists.findFirst({
    where: eq(playlists.id, playlistId),
    with: {
      items: true,
    },
  });
}

export async function getPlaylistByUserIdAndName(userId: string, name: string) {
  return await db.query.playlists.findFirst({
    where: and(eq(playlists.name, name), eq(playlists.userId, userId)),
  });
}

export async function getPlaylistByUserIdAndNameWithItems(
  userId: string,
  name: string,
) {
  return await db.query.playlists.findFirst({
    where: and(eq(playlists.name, name), eq(playlists.userId, userId)),
    with: {
      items: true,
    },
  });
}

export async function getItemFromPlaylist(
  playlistId: string,
  entityId: string,
) {
  return await db.query.playlistItems.findFirst({
    where: and(
      eq(playlistItems.playlistId, playlistId),
      eq(playlistItems.itemId, entityId),
    ),
  });
}

export async function addToPlaylist(
  entityId: string,
  type: Entity,
  playlistId: string,
) {
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

  return await db
    .insert(playlistItems)
    .values({
      playlistId: playlistId,
      itemId: entityId,
      itemType: itemType,
    })
    .returning();
}

export async function removeFromPlaylist(
  entityId: string,
  type: Entity,
  playlistId: string,
) {
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

  return await db
    .delete(playlistItems)
    .where(
      and(
        eq(playlistItems.itemId, entityId),
        eq(playlistItems.playlistId, playlistId),
      ),
    )
    .returning();
}
