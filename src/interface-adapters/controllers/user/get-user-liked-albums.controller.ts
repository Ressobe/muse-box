import {
  DatabaseOperationError,
  InputParseError,
} from "@/src/entities/errors/common";
import { z } from "zod";
import { getPlaylistByUserIdAndNameUseCase } from "../playlist/get-playlist-by-user-id-and-name.use-case";
import { entityToPlaylists } from "@/types";
import { getPlaylistInfoUseCase } from "@/src/application/use-cases/playlist/get-playlist-info.use-case";
import { getAlbumWithTracksUseCase } from "@/src/application/use-cases/album/get-album-with-tracks.use-case";

const inputSchema = z.object({
  userId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getUserLikedAlbumsController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in getUserLikedAlbumsController");
  }

  const { userId } = data;

  const playlistName = entityToPlaylists["album"];
  const playlist = await getPlaylistByUserIdAndNameUseCase(
    userId,
    playlistName,
  );
  if (!playlist) {
    return [];
  }

  const { items } = await getPlaylistInfoUseCase(playlist.id);

  const albums = await Promise.all(
    items.map(async (item) => {
      const album = await getAlbumWithTracksUseCase(item.itemId);

      if (!album) {
        throw new DatabaseOperationError("Invalid artist id");
      }
      return {
        ...album,
      };
    }),
  );

  return albums;
}
