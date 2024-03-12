import db from "@/src/lib/db";
import { isFollowingArtist, readProfile } from "./profile";
import { createComment, findComment, deleteComment } from "./comment";
import { Artist } from "@prisma/client";
import { CommentResult } from "../types/database";

type ArtistSucess = [Artist, null];
type ArtistFail = [null, Error];
type ArtistResult = ArtistSucess | ArtistFail;

export async function getAllArtists(take: number, profileId?: string) {
  const artists = await db.artist.findMany({
    take: take,
    include: { stats: true },
  });

  const artists2 = await Promise.all(
    artists.map(async (artist) => {
      const isFollowed = await isFollowingArtist(profileId, artist.id);
      const isLiked = await isArtistLiked(artist.id, profileId);
      return { ...artist, isFollowed, isLiked };
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

export async function readArtist(artistId: string): Promise<ArtistResult> {
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

export async function deleteArtist(artistId: string): Promise<ArtistResult> {
  try {
    const artist = await db.artist.delete({ where: { id: artistId } });
    return [artist, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function createArtistComment(
  artistId: string,
  creatorId: string,
  rate: number,
  content: string,
): Promise<CommentResult> {
  try {
    const [, notFoundProfileError] = await readProfile(creatorId);
    if (notFoundProfileError) throw notFoundProfileError;

    const [comment, _] = await findComment(creatorId, artistId, "ARTIST");
    if (comment) throw Error("Comment already exist");

    const [createdComment, errorCreatedComment] = await createComment(
      creatorId,
      artistId,
      "ARTIST",
      rate,
      content,
    );
    if (errorCreatedComment) throw errorCreatedComment;

    const notUpdatedStats = await updateArtistStats(artistId);
    if (notUpdatedStats) throw notUpdatedStats;

    return [createdComment, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function deleteArtistComment(artistId: string, commentId: string) {
  try {
    const comment = await deleteComment(commentId);

    const notUpdatedStats = await updateArtistStats(artistId);
    if (notUpdatedStats) throw notUpdatedStats;

    return [comment, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function updateArtistStats(artistId: string) {
  try {
    const artist = await db.artist.findUnique({
      where: {
        id: artistId,
      },
      include: {
        comments: {
          select: {
            rate: true,
          },
        },
      },
    });
    if (!artist) {
      throw new Error("Artist not found");
    }

    let totalRate = 0;
    let numberOfRatings = 0;

    for (const comment of artist.comments) {
      totalRate += comment.rate;
      numberOfRatings++;
    }

    const avgRate =
      numberOfRatings > 0 ? Math.round(totalRate / numberOfRatings) : 0;

    await db.artistStats.upsert({
      where: {
        ownerId: artistId,
      },
      update: {
        avg_rating: avgRate,
        amount_of_ratings: numberOfRatings,
      },
      create: {
        avg_rating: avgRate,
        amount_of_ratings: numberOfRatings,
        ownerId: artistId,
      },
    });
  } catch (error) {
    return error;
  }
}
