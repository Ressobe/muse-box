"use server";

import { auth } from "@/auth";
import { addToPlaylistController } from "@/src/interface-adapters/controllers/playlist/add-to-playlist.controller";
import { removeFromPlaylistController } from "@/src/interface-adapters/controllers/playlist/remove-from-playlist.controller";
import { Entity } from "@/types";

const entityToPlaylists = {
  artist: "Favourite Artists",
  album: "Favourite Albums",
  track: "Favourite Tracks",
};

export async function likeAction(
  userId: string,
  entityId: string,
  type: Entity,
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
  type: Entity,
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
