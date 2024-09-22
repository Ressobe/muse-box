import { container } from "@/di/container";
import { IPlaylistsRepository } from "@/src/application/repositories/playlists.repository.interface";

export async function createPlaylistUseCase(userId: string, name: string) {
  const playlistsRepository = container.get<IPlaylistsRepository>(
    "IPlaylistsRepository",
  );

  const playlist = playlistsRepository.insertPlaylist(userId, name);

  return playlist;
}
