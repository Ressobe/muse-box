"use server";

import { auth } from "@/auth";
import { Content } from "@/src/entities/models/content";
import { addToPlaylistController } from "@/src/interface-adapters/controllers/playlist/add-to-playlist.controller";
import { removeFromPlaylistController } from "@/src/interface-adapters/controllers/playlist/remove-from-playlist.controller";

const entityToPlaylists = {
  artist: "Favourite Artists",
  album: "Favourite Albums",
  track: "Favourite Tracks",
};

export async function likeAction(
  userId: string,
  entityId: string,
  type: Content,
) {
  const session = await auth();
  if (!session) {
    return { error: "Not authorized access!" };
  }

  if (!session.user.id) {
    return { error: "Not authorized access!" };
  }

  const playlistName = entityToPlaylists[type];
  if (!playlistName) {
    return { error: "Something went wrong!" };
  }

  await addToPlaylistController({ userId, entityId, type, playlistName });
}

export async function unlikeAction(
  userId: string,
  entityId: string,
  type: Content,
) {
  const session = await auth();
  if (!session) {
    return { error: "Not authorized access!" };
  }

  if (!session.user.id) {
    return { error: "Not authorized access!" };
  }

  const playlistName = entityToPlaylists[type];
  if (!playlistName) {
    return { error: "Something went wrong!" };
  }

  await removeFromPlaylistController({ userId, entityId, type, playlistName });
}
