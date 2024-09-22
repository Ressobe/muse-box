import {
  DatabaseOperationError,
  InputParseError,
} from "@/src/entities/errors/common";
import { z } from "zod";
import { getPlaylistByUserIdAndNameUseCase } from "../playlist/get-playlist-by-user-id-and-name.use-case";
import { entityToPlaylists } from "@/src/entities/types";
import { getPlaylistInfoUseCase } from "@/src/application/use-cases/playlist/get-playlist-info.use-case";
import { getTrackInfoUseCase } from "@/src/application/use-cases/track/get-track-info.use-case";

const inputSchema = z.object({
  userId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getUserLikedTracksController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in getUserLikedTracksController");
  }

  const { userId } = data;

  const playlistName = entityToPlaylists["track"];
  const playlist = await getPlaylistByUserIdAndNameUseCase(
    userId,
    playlistName,
  );
  if (!playlist) {
    return [];
  }

  const { items } = await getPlaylistInfoUseCase(playlist.id);

  const tracks = await Promise.all(
    items.map(async (item) => {
      const track = await getTrackInfoUseCase(item.itemId);

      if (!track) {
        throw new DatabaseOperationError("Invalid artist id");
      }
      return {
        ...track,
      };
    }),
  );

  return tracks;
}
