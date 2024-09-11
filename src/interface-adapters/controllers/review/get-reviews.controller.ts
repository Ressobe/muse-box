import { getAlbumUseCase } from "@/src/application/use-cases/album/get-album.use-case";
import { getArtistUseCase } from "@/src/application/use-cases/artist/get-artist.use-case";
import { getReviewsUseCase } from "@/src/application/use-cases/review/get-reviews.use-case";
import { getTrackUseCase } from "@/src/application/use-cases/track/get-track.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { Album } from "@/src/entities/models/album";
import { ArtistSelect } from "@/src/entities/models/artist";
import { contentSchema } from "@/src/entities/models/content";
import { Track } from "@/src/entities/models/track";
import { z } from "zod";

const inputSchema = z.object({
  entityId: z.string(),
  type: contentSchema,
  page: z.number(),
  perPage: z.number(),
});

type EntityUseCaseMap = {
  artist: (artistId: string) => Promise<ArtistSelect | undefined>;
  album: (albumId: string) => Promise<Album | undefined>;
  track: (trackId: string) => Promise<Track | undefined>;
};

const entityUseCaseMap: EntityUseCaseMap = {
  artist: getArtistUseCase,
  album: getAlbumUseCase,
  track: getTrackUseCase,
};

export async function getReviewsController(input: any) {
  const { data, error: inputParserError } = inputSchema.safeParse(input);
  if (inputParserError) {
    throw new InputParseError("Invalid input in get reviews controller");
  }

  const { entityId, type, page, perPage } = data;

  const entity: ArtistSelect | Album | Track | undefined =
    await entityUseCaseMap[type](entityId);

  if (!entity) {
    throw new Error(`Entity of type "${type}" with ID "${entityId}" not found`);
  }

  const { reviews, totalPages } = await getReviewsUseCase(
    entityId,
    type,
    page,
    perPage,
  );

  return { entity, reviews, totalPages };
}
