import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getArtistInfoUseCase } from "@/src/application/use-cases/artist/get-artist.use-case";
import { getGenresForArtistUseCase } from "@/src/application/use-cases/genres/get-genres-for-artist.use-case";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { ArtistWithStats } from "@/src/entities/models/artist";
import { Genre } from "@/src/entities/models/genre";

function presenter(
  artist: ArtistWithStats,
  genres: Genre[],
  isLiked?: boolean,
) {
  return {
    artist: artist,
    genres: genres,
    isLiked: isLiked !== undefined ? isLiked : undefined,
  };
}

export async function getArtistInfoController(artistId: string) {
  const authenticationRepository = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );
  const userId = await authenticationRepository.getUserId();

  const artist = await getArtistInfoUseCase(artistId);

  if (!artist) {
    throw Error("Artist not found!");
  }

  const genres = await getGenresForArtistUseCase(artistId);

  let isLiked: boolean | undefined = undefined;
  if (userId) {
    isLiked = await isItemLikedByUserUseCase(userId, artistId, "artist");
  }

  return presenter(artist, genres, isLiked);
}
