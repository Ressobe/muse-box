import { InputParseError } from "@/src/entities/errors/common";
import { contentSchema } from "@/src/entities/models/content";
import { z } from "zod";
import { getPlaylistByUserIdAndNameUseCase } from "./get-playlist-by-user-id-and-name.use-case";
import { createPlaylistUseCase } from "@/src/application/use-cases/playlist/create-playlist.use-case";
import { addToPlaylistUseCase } from "@/src/application/use-cases/playlist/add-to-playlist.use-case";

const inputSchema = z.object({
  userId: z.string(),
  entityId: z.string(),
  type: contentSchema,
  playlistName: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function addToPlaylistController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in addToPlaylistController");
  }

  const { userId, entityId, type, playlistName } = data;

  let playlist = await getPlaylistByUserIdAndNameUseCase(userId, playlistName);
  if (!playlist) {
    playlist = await createPlaylistUseCase(userId, playlistName);
  }

  const item = await addToPlaylistUseCase(entityId, type, playlist.id);

  return item;
}
