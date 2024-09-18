import { container } from "@/di/container";
import { IPlaylistsRepository } from "@/src/application/repositories/playlists.repository.interface";
import { getPlaylistImageUseCase } from "@/src/application/use-cases/playlist/get-playlist-image.use-case";

export async function getUserPlaylistsUseCase(userId: string) {
  const playlistsRepository = container.get<IPlaylistsRepository>(
    "IPlaylistsRepository",
  );

  const playlists = await playlistsRepository.getPlaylistsForUser(userId);

  const playlistsWithImages = await Promise.all(
    playlists.map(async (playlist) => ({
      ...playlist,
      image: await getPlaylistImageUseCase(playlist.id),
    })),
  );

  return playlistsWithImages;
}
