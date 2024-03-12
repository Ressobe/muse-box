import db from "@/src/lib/db";

export async function getRecording(artistId: string, recordingId: string) {
  return await db.recording.findUnique({
    where: {
      id: recordingId,
      artistId: artistId,
    },
    include: {
      comments: true,
      tracks: true,
      external_links: true,
      label: true,
    },
  });
}

export async function getAlbums(artistId: string, take: number) {
  return await db.recording.findMany({
    where: {
      artistId: artistId,
      type: "ALBUM",
    },
  });
}

export async function getLatestRecordings(artistId: string, take: number) {
  return await db.recording.findMany({
    where: { artistId: artistId },
    // orderBy: {
    //   date_year: "desc",
    //   date_month: "desc",
    //   date_day: "desc",
    // },
    take: take,
  });
}

export async function createRecordingComment(
  recordingId: string,
  creatorId: string,
  rate: number,
  comment: string,
) {
  await db.recording.update({
    where: { id: recordingId },
    data: {
      comments: {
        create: {
          rate: rate,
          content: comment,
          ownerId: creatorId,
          type: "RECORDING",
        },
      },
    },
  });
}

export async function updateRecordingStats(
  recordingId: string,
): Promise<null | Error> {
  try {
    const recording = await db.recording.findUnique({
      where: {
        id: recordingId,
      },
      include: {
        comments: {
          select: {
            rate: true,
          },
        },
      },
    });

    if (!recording) {
      throw new Error("Recording not found");
    }

    let totalRate = 0;
    let numberOfRatings = 0;

    for (const comment of recording.comments) {
      totalRate += comment.rate;
      numberOfRatings++;
    }

    const avgRate =
      numberOfRatings > 0 ? Math.round(totalRate / numberOfRatings) : 0;

    await db.recordingStats.upsert({
      where: {
        ownerId: recordingId,
      },
      update: {
        avg_rating: avgRate,
        amount_of_ratings: numberOfRatings,
      },
      create: {
        avg_rating: avgRate,
        amount_of_ratings: numberOfRatings,
        ownerId: recordingId,
      },
    });
    return null;
  } catch (error) {
    return error as Error;
  }
}
