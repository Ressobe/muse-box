import { container } from "@/di/container";
import { IPlaylistsRepository } from "@/src/application/repositories/playlists.repository.interface";
import { Content } from "@/src/entities/models/content";

export async function addToPlaylistUseCase(
  entityId: string,
  type: Content,
  playlistId: string,
) {
  const playlistsRepository = container.get<IPlaylistsRepository>(
    "IPlaylistsRepository",
  );

  const item = playlistsRepository.addItemToPlaylist(
    entityId,
    type,
    playlistId,
  );

  return item;
}
