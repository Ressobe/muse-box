import db from "@/src/lib/db";
import { createComment, deleteComment } from "./comment";
import { Result } from "../types/database";
import { Comment } from "@prisma/client";

export async function createTrackComment(
  trackId: string,
  creatorId: string,
  rate: number,
  content: string,
): Promise<Result<Comment, Error>> {
  try {
    const [comment, notCreatedCommentError] = await createComment(
      creatorId,
      trackId,
      "TRACK",
      rate,
      content,
    );
    if (notCreatedCommentError) throw notCreatedCommentError;

    const notUpdatedStats = await updateTrackStats(trackId);
    if (notUpdatedStats) throw notUpdatedStats;

    return [comment, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function deleteTrackComment(trackId: string, commentId: string) {
  try {
    const [comment, deleteCommentError] = await deleteComment(commentId);
    if (deleteCommentError) throw deleteCommentError;

    const notUpdatedStats = await updateTrackStats(trackId);
    if (notUpdatedStats) throw notUpdatedStats;

    return [comment, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function updateTrackStats(trackId: string): Promise<null | Error> {
  try {
    const track = await db.track.findUnique({
      where: {
        id: trackId,
      },
      include: {
        comments: {
          select: {
            rate: true,
          },
        },
      },
    });
    if (!track) {
      throw new Error("Track not found");
    }

    let totalRate = 0;
    let numberOfRatings = 0;

    for (const comment of track.comments) {
      totalRate += comment.rate;
      numberOfRatings++;
    }

    const avgRate =
      numberOfRatings > 0 ? Math.round(totalRate / numberOfRatings) : 0;

    await db.trackStats.upsert({
      where: {
        ownerId: trackId,
      },
      update: {
        avg_rating: avgRate,
        amount_of_ratings: numberOfRatings,
      },
      create: {
        avg_rating: avgRate,
        amount_of_ratings: numberOfRatings,
        ownerId: trackId,
      },
    });
    return null;
  } catch (error) {
    return error as Error;
  }
}
