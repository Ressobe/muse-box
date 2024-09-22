import { container } from "@/di/container";
import { Content } from "@/src/entities/models/content";
import { IPlaylistsRepository } from "@/src/application/repositories/playlists.repository.interface";
import { entityToPlaylists } from "@/src/entities/types";

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

  if (!playlist) {
    return false;
  }

  const item = await playlistRepositories.getItemFromPlaylist(
    playlist.id,
    entityId,
  );

  return !!item;
}
