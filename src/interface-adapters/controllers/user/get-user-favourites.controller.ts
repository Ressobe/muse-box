import { getAlbumUseCase } from "@/src/application/use-cases/album/get-album.use-case";
import { getArtistUseCase } from "@/src/application/use-cases/artist/get-artist.use-case";
import { getProfileUseCase } from "@/src/application/use-cases/profile/get-profile.use-case";
import { getTrackInfoUseCase } from "@/src/application/use-cases/track/get-track-info.use-case";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  userId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getUserFavouritesController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in getUserFavouritesController");
  }

  const { userId } = data;

  const profile = await getProfileUseCase(userId);
  if (!profile) {
    throw new NotFoundError("Profile not found");
  }

  const artist = profile.favouriteArtistId
    ? await getArtistUseCase(profile.favouriteArtistId)
    : null;

  const album = profile.favouriteAlbumId
    ? await getAlbumUseCase(profile.favouriteAlbumId)
    : null;

  const track = profile.favouriteTrackId
    ? await getTrackInfoUseCase(profile.favouriteTrackId)
    : null;

  return {
    artist: artist ?? null,
    album: album ?? null,
    track: track ?? null,
  };
}
