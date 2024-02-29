import db from "@/src/lib/db";
import { connect } from "http2";

export async function createPlaylist(
  ownerId: string,
  playlistName: string,
  isPublic = false,
) {
  await db.profile.update({
    where: { id: ownerId },
    data: {
      playlist: {
        create: {
          name: playlistName,
          isPublic: isPublic,
        },
      },
    },
  });
}

export async function addToPlaylist(playlistId: string, ...tracksId: string[]) {
  await db.playlist.update({
    where: { id: playlistId },
    data: {
      tracks: {
        connect: tracksId.map((track) => ({
          id: track,
        })),
      },
    },
  });
}

export async function likeArtist(artistId: string, profileId: string) {
  const existingPlaylist = await db.playlist.findFirst({
    where: {
      ownerId: profileId,
      name: "Fav Artists",
    },
  });

  if (!existingPlaylist) {
    await db.playlist.create({
      data: {
        name: "Fav Artists",
        isPublic: false,
        owner: { connect: { id: profileId } },
        artists: { connect: { id: artistId } },
      },
    });
    return;
  }
  await db.playlist.update({
    where: { id: existingPlaylist.id },
    data: {
      artists: {
        connect: {
          id: artistId,
        },
      },
    },
  });
}

export async function removePlaylist(playlistId: string) {
  await db.playlist.delete({
    where: { id: playlistId },
  });
}
