import {
  DatabaseOperationError,
  InputParseError,
} from "@/src/entities/errors/common";
import { z } from "zod";
import { getPlaylistByUserIdAndNameUseCase } from "../playlist/get-playlist-by-user-id-and-name.use-case";
import { entityToPlaylists } from "@/types";
import { getPlaylistInfoUseCase } from "@/src/application/use-cases/playlist/get-playlist-info.use-case";
import { getArtistUseCase } from "@/src/application/use-cases/artist/get-artist.use-case";

const inputSchema = z.object({
  userId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getUserLikedArtistsController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in getUserLikedArtistsController");
  }

  const { userId } = data;

  const playlistName = entityToPlaylists["artist"];
  const playlist = await getPlaylistByUserIdAndNameUseCase(
    userId,
    playlistName,
  );
  if (!playlist) {
    return [];
  }

  const { items } = await getPlaylistInfoUseCase(playlist.id);

  const artists = await Promise.all(
    items.map(async (item) => {
      const artist = await getArtistUseCase(item.itemId);

      if (!artist) {
        throw new DatabaseOperationError("Invalid artist id");
      }
      return {
        ...artist,
      };
    }),
  );

  return artists;
}
