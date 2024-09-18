import { container } from "@/di/container";
import { IAuthenticationService } from "@/src/application/services/authentication.service.interface";
import { getAlbumWithTracksUseCase } from "@/src/application/use-cases/album/get-album-with-tracks.use-case";
import { isItemLikedByUserUseCase } from "@/src/application/use-cases/playlist/is-item-liked-by-user.use-case";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import { AlbumWithRelations } from "@/src/entities/models/album";
import { getTrackRatingOwnedByUserController } from "../track/get-track-rating-owned-by-user-controller";

function presenter(album: AlbumWithRelations) {
  return {
    id: album.id,
    image: album.image,
    title: album.title,
    artist: album.artist,
    stats: album.stats,
    releaseDate: album.releaseDate,
    tracks: album.tracks,
    albumType: {
      name: album.albumType.name,
    },
    defaultRate: album.defaultRate ?? undefined,
    isLiked: album.isLiked ?? undefined,
  };
}

export async function getAlbumInfoController(albumId: string | undefined) {
  if (!albumId) {
    throw new InputParseError("Album id not provided");
  }

  const album = await getAlbumWithTracksUseCase(albumId);
  if (!album) {
    throw new NotFoundError("Album not founded");
  }

  const authenticationService = container.get<IAuthenticationService>(
    "IAuthenticationService",
  );

  const userId = await authenticationService.getUserId();

  if (userId) {
    const isLiked = await isItemLikedByUserUseCase(userId, album.id, "album");
    const tracksWithLikes = await Promise.all(
      album.tracks.map(async (track) => ({
        ...track,
        defaultRate: await getTrackRatingOwnedByUserController(
          track.id,
          userId,
        ),
        isLiked: await isItemLikedByUserUseCase(userId, track.id, "track"),
      })),
    );
    return presenter({ ...album, isLiked, tracks: tracksWithLikes });
  }

  return presenter(album);
}
