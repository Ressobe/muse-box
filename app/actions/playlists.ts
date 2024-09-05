"use server";

import { auth } from "@/auth";
import { Entity } from "@/types";
import {
  addToPlaylistUseCase,
  removeFromPlaylistUseCase,
} from "@/use-cases/playlist";

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

  await addToPlaylistUseCase(userId, entityId, type, playlistName);
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

  await removeFromPlaylistUseCase(userId, entityId, type, playlistName);
}
