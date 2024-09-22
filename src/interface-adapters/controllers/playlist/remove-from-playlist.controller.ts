import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import { contentSchema } from "@/src/entities/models/content";
import { z } from "zod";
import { getPlaylistByUserIdAndNameUseCase } from "./get-playlist-by-user-id-and-name.use-case";
import { removeFromPlaylistUseCase } from "@/src/application/use-cases/playlist/remove-from-playlist.use-case";

const inputSchema = z.object({
  userId: z.string(),
  entityId: z.string(),
  type: contentSchema,
  playlistName: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function removeFromPlaylistController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in addToPlaylistController");
  }

  const { userId, entityId, type, playlistName } = data;

  let playlist = await getPlaylistByUserIdAndNameUseCase(userId, playlistName);
  if (!playlist) {
    throw new NotFoundError("Playlist not found");
  }

  const item = await removeFromPlaylistUseCase(entityId, type, playlist.id);

  return item;
}
