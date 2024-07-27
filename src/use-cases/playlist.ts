import { getAlbum, getAlbumById, getAlbumImage } from "@/data-access/album";
import { getArtistById, getArtistImage } from "@/data-access/artist";
import {
  addToPlaylist,
  createPlaylist,
  getItemFromPlaylist,
  getPlaylistById,
  getPlaylistByUserIdAndName,
  getPlaylistByUserIdAndNameWithItems,
  removeFromPlaylist,
} from "@/data-access/playlist";
import { getTrack, getTrackById, getTrackImage } from "@/data-access/track";
import { Entity, entityToPlaylists, PlaylistResponse } from "@/types";

export async function addToPlaylistUseCase(
  userId: string,
  entityId: string,
  type: Entity,
  playlistName: string,
) {
  let playlist = await getPlaylistByUserIdAndName(userId, playlistName);

  if (!playlist) {
    playlist = await createPlaylist(userId, playlistName);
  }

  return await addToPlaylist(entityId, type, playlist.id);
}

export async function removeFromPlaylistUseCase(
  userId: string,
  entityId: string,
  type: Entity,
  playlistName: string,
) {
  let playlist = await getPlaylistByUserIdAndName(userId, playlistName);

  if (!playlist) {
    throw new Error("Playlist not found!");
  }

  return await removeFromPlaylist(entityId, type, playlist.id);
}

export async function isUserLikedItUseCase(
  userId: string,
  entityId: string,
  type: Entity,
) {
  const playlistName = entityToPlaylists[type];
  if (!playlistName) {
    throw new Error("Playlist not found!");
  }

  let playlist = await getPlaylistByUserIdAndName(userId, playlistName);
  if (!playlist) {
    return false;
  }

  const item = await getItemFromPlaylist(playlist.id, entityId);
  return !!item;
}

export async function getFavouritePlaylist(
  type: Entity,
  userId: string,
): Promise<PlaylistResponse | null> {
  const playlistName = entityToPlaylists[type];
  if (!playlistName) {
    throw new Error("Playlist not found!");
  }
  const playlist = await getPlaylistByUserIdAndNameWithItems(
    userId,
    playlistName,
  );
  if (!playlist) {
    return null;
  }

  if (playlist?.items) {
    return null;
  }

  const firstItem = playlist.items[0];

  switch (firstItem.itemType) {
    case "artist":
      return await Promise.all(
        playlist.items.map(async (item) => {
          const artist = await getArtistById(item.id);
          if (!artist) {
            throw new Error("Invalid artist id");
          }

          return {
            ...artist,
          };
        }),
      );
    case "album":
      return await Promise.all(
        playlist.items.map(async (item) => {
          const album = await getAlbum(item.id);
          if (!album) {
            throw new Error("Invalid album id");
          }

          return {
            ...album,
          };
        }),
      );
    case "track":
      return await Promise.all(
        playlist.items.map(async (item) => {
          const track = await getTrack(item.id);
          if (!track) {
            throw new Error("Invalid track id");
          }

          return {
            ...track,
          };
        }),
      );
    default:
      throw new Error(`Unknown item type: ${firstItem.itemType}`);
  }
}

export async function getPlaylistImageUseCase(playlistId: string) {
  const playlist = await getPlaylistById(playlistId);
  if (!playlist) {
    return null;
  }

  if (playlist.items.length === 0) {
    return null;
  }
  const firstItem = playlist.items[0];

  switch (firstItem.itemType) {
    case "artist":
      return await getArtistImage(firstItem.itemId);
    case "album":
      return await getAlbumImage(firstItem.itemId);
    case "track":
      return await getTrackImage(firstItem.itemId);
    default:
      throw new Error(`Unknown item type: ${firstItem.itemType}`);
  }
}

export async function getPlaylistUseCase(playlistId: string) {
  return await getPlaylistById(playlistId);
}

export async function getPlaylistTypeUseCase(playlistId: string) {
  const playlist = await getPlaylistById(playlistId);
  if (!playlist) {
    return null;
  }

  if (playlist.items.length === 0) {
    return null;
  }
  return playlist.items[0].itemType as Entity;
}
