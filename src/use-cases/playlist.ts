import { getAlbumImage } from "@/data-access/album";
import { getArtistImage } from "@/data-access/artist";
import {
  addToPlaylist,
  createPlaylist,
  getItemFromPlaylist,
  getPlaylistById,
  getPlaylistByUserIdAndName,
  removeFromPlaylist,
} from "@/data-access/playlist";
import { getTrackImage } from "@/data-access/track";
import { Entity } from "@/types";

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
  const entityToPlaylists = {
    artist: "Favourite Artists",
    album: "Favourite Albums",
    track: "Favourite Tracks",
  };

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
