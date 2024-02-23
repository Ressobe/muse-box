import db from "@/src/lib/db";
import { isFollowingArtist } from "./profile";

export async function getAllArtists(take: number, profileId?: string) {
  const artists = await db.artist.findMany({
    take: take,
    include: { stats: true },
  });

  const artistsWithFollowStatus = await Promise.all(
    artists.map(async (artist) => {
      const isFollowed = await isFollowingArtist(profileId, artist.id);
      return { ...artist, isFollowed };
    })
  );

  return artistsWithFollowStatus;
}

export async function getArtist(artistId: string) {
  return await db.artist.findUnique({
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
}

export async function followArtist(
  artistId: string,
  profileId: string | undefined
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

export async function createArtistComment(
  artistId: string,
  creatorId: string,
  rate: number,
  comment: string
) {
  await db.artist.update({
    where: { id: artistId },
    data: {
      comments: {
        create: {
          rate: rate,
          content: comment,
          ownerId: creatorId,
          type: "ARTIST",
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
