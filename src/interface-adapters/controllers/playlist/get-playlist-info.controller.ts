import { getPlaylistInfoUseCase } from "@/src/application/use-cases/playlist/get-playlist-info.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  playlistId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getPlaylistInfoController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Playlist id not provided");
  }

  const playlist = await getPlaylistInfoUseCase(data.playlistId);

  return playlist;
}
