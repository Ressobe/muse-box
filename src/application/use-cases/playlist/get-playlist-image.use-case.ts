import { container } from "@/di/container";
import { IPlaylistsRepository } from "@/src/application/repositories/playlists.repository.interface";
import { IArtistsRepository } from "@/src/application/repositories/artists.repository.interface";
import { IAlbumsRepository } from "@/src/application/repositories/albums.repository.interface";
import { ITracksRepository } from "@/src/application/repositories/tracks.repository.interface";

export async function getPlaylistImageUseCase(playlistId: string) {
  const playlistsRepository = container.get<IPlaylistsRepository>(
    "IPlaylistsRepository",
  );
  const artistsRepository =
    container.get<IArtistsRepository>("IArtistsRepository");
  const albumsRepository =
    container.get<IAlbumsRepository>("IAlbumsRepository");
  const tracksRepository =
    container.get<ITracksRepository>("ITracksRepository");

  const playlist = await playlistsRepository.getPlaylistInfo(playlistId);
  if (!playlist) {
    return null;
  }

  if (playlist.items.length === 0) {
    return null;
  }
  const firstItem = playlist.items[0];

  let image: string | null = null;

  switch (firstItem.itemType) {
    case "artist":
      image = await artistsRepository.getArtistImage(firstItem.itemId);
      break;
    case "album":
      image = await albumsRepository.getAlbumImage(firstItem.itemId);
      break;
    case "track":
      image = await tracksRepository.getTrackImage(firstItem.itemId);
      break;
    default:
      throw new Error(`Unknown item type: ${firstItem.itemType}`);
  }

  return image;
}
