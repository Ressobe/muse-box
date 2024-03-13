import db from "@/src/lib/db";
import { isFollowingArtist } from "./profile";
import { Artist } from "@prisma/client";
import { Result } from "../types/database";

export async function getAllArtists(take: number, profileId?: string) {
  const artists = await db.artist.findMany({
    take: take,
    include: {
      albums: true,
      comments: true,
      stats: true,
      external_links: true,
      tags: true,
      genres: true,
    },
  });

  const artists2 = await Promise.all(
    artists.map(async (artist) => {
      const isFollowed = await isFollowingArtist(profileId, artist.id);
      const isCommented = await isArtistCommentedByProfile(
        artist.id,
        profileId,
      );
      const isLiked = await isArtistLiked(artist.id, profileId);

      return { ...artist, isFollowed, isLiked, isCommented };
    }),
  );

  return artists2;
}

export async function getArtist(
  artistId: string,
  profileId: string | undefined,
) {
  const artist = await db.artist.findUnique({
    where: {
      id: artistId,
    },
    include: {
      albums: true,
      comments: true,
      stats: true,
      external_links: true,
      tags: true,
      genres: true,
    },
  });
  const isFollowed = await isFollowingArtist(profileId, artistId);
  const isCommented = await isArtistCommentedByProfile(artistId, profileId);
  const isLiked = await isArtistLiked(artistId, profileId);

  return { ...artist, isFollowed, isCommented, isLiked };
}

export async function followArtist(
  artistId: string,
  profileId: string | undefined,
) {
  if (!profileId) {
    return null;
  }

  if (await isFollowingArtist(profileId, artistId)) {
    return;
  }
  await db.profile.update({
    where: { id: profileId },
    data: {
      followedArtists: {
        connect: {
          id: artistId,
        },
      },
    },
  });
  await db.artist.update({
    where: { id: artistId },
    data: {
      stats: {
        update: {
          amount_of_followers: { increment: 1 },
        },
      },
    },
  });
}

export async function unfollowArtist(artistId: string, profileId?: string) {
  if (!profileId) {
    return null;
  }
  await db.profile.update({
    where: { id: profileId },
    data: {
      followedArtists: {
        disconnect: {
          id: artistId,
        },
      },
    },
  });
  await db.artist.update({
    where: { id: artistId },
    data: {
      stats: {
        update: {
          amount_of_followers: { decrement: 1 },
        },
      },
    },
  });
}

export async function updateStats() {
  const artists = await db.artist.findMany();

  for (const a of artists) {
    const albums = await db.recording.findMany({
      where: {
        type: "ALBUM",
        artistId: a.id,
      },
    });
    const singles = await db.recording.findMany({
      where: {
        type: "SINGLE",
        artistId: a.id,
      },
    });
    const recordingWithTracksCount = await db.recording.findMany({
      where: {
        artistId: a.id,
      },
      select: {
        _count: {
          select: {
            tracks: true,
          },
        },
      },
    });
    const amountOfAlbums = albums.length;
    const amountOfSingles = singles.length;
    const amountOfTracks = recordingWithTracksCount.reduce((tracks, item) => {
      return tracks + item._count.tracks;
    }, 0);

    await db.artist.update({
      where: { id: a.id },
      data: {
        stats: {
          create: {
            amount_of_albums: amountOfAlbums,
            amount_of_singles: amountOfSingles,
            amount_of_tracks: amountOfTracks,
          },
        },
      },
    });
  }
}

export async function isArtistLiked(
  artistId: string,
  profileId: string | undefined,
) {
  if (!profileId) {
    return false;
  }
  const playlist = await db.playlist.findFirst({
    where: {
      ownerId: profileId,
      name: "Fav Artists",
      artists: { some: { id: artistId } },
    },
  });

  return !!playlist;
}

export default async function isArtistCommentedByProfile(
  artistId: string,
  profileId?: string,
) {
  const comment = await db.comment.findFirst({
    where: {
      artistId: artistId,
      ownerId: profileId,
      type: "ARTIST",
    },
  });
  if (!comment) {
    return false;
  }
  return true;
}

export async function unlikeArtist(artistId: string, profileId: string) {
  const existingPlaylist = await db.playlist.findFirst({
    where: {
      ownerId: profileId,
      name: "Fav Artists",
      artists: { some: { id: artistId } },
    },
  });

  if (existingPlaylist) {
    await db.playlist.update({
      where: { id: existingPlaylist.id },
      data: {
        artists: { disconnect: { id: artistId } },
      },
    });
  }
}

export async function readArtist(
  artistId: string,
): Promise<Result<Artist, Error>> {
  try {
    const artist = await db.artist.findUnique({
      where: { id: artistId },
      include: {
        stats: true,
      },
    });
    if (!artist) throw Error("Artist not found");

    return [artist, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function deleteArtist(
  artistId: string,
): Promise<Result<Artist, Error>> {
  try {
    const artist = await db.artist.delete({ where: { id: artistId } });
    return [artist, null];
  } catch (error) {
    return [null, error as Error];
  }
}
