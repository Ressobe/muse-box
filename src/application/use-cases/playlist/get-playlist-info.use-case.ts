import { container } from "@/di/container";
import { IPlaylistsRepository } from "@/src/application/repositories/playlists.repository.interface";
import { NotFoundError } from "@/src/entities/errors/common";
import { Content } from "@/src/entities/models/content";

export async function getPlaylistInfoUseCase(playlistId: string) {
  const playlistsRepository = container.get<IPlaylistsRepository>(
    "IPlaylistsRepository",
  );

  const playlist = await playlistsRepository.getPlaylistInfo(playlistId);
  if (!playlist) {
    throw new NotFoundError("Playlist not founded");
  }

  let playlistType: Content | null = null;
  if (playlist.items.length > 0) {
    playlistType = playlist.items[0].itemType as Content;
  }

  return { ...playlist, type: playlistType };
}
