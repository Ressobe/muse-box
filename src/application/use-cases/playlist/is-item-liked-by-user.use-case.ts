import { container } from "@/di/container";
import { Content } from "@/src/entities/models/content";
import { IPlaylistsRepository } from "../../repositories/playlists.repository.interface";
import { entityToPlaylists } from "@/types";
import { DatabaseOperationError } from "@/src/entities/errors/common";

export async function isItemLikedByUserUseCase(
  userId: string,
  entityId: string,
  type: Content,
) {
  const playlistName = entityToPlaylists[type];
  if (!playlistName) {
    throw new Error("Playlist not found!");
  }

  const playlistRepositories = container.get<IPlaylistsRepository>(
    "IPlaylistsRepository",
  );

  let playlist = await playlistRepositories.getPlaylistByNameForUser(
    userId,
    playlistName,
  );

  // move errors to db
  if (!playlist) {
    throw new DatabaseOperationError("Playlist does not exist!");
  }

  const item = await playlistRepositories.getItemFromPlaylist(
    playlist.id,
    entityId,
  );

  return !!item;
}
