import { container } from "@/di/container";
import { IPlaylistsRepository } from "@/src/application/repositories/playlists.repository.interface";
import { Content } from "@/src/entities/models/content";

export async function removeFromPlaylistUseCase(
  entityId: string,
  type: Content,
  playlistId: string,
) {
  const playlistsRepository = container.get<IPlaylistsRepository>(
    "IPlaylistsRepository",
  );

  const item = playlistsRepository.deleteItemFromPlaylist(
    entityId,
    type,
    playlistId,
  );

  return item;
}
