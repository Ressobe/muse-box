import db from "@/src/lib/db";
import { Comment, CommentType } from "@prisma/client";
import { Result } from "../types/database";
import { readProfile } from "./profile";

export async function createCommentInternal(
  ownerId: string,
  commentedId: string,
  type: CommentType,
  rate: number,
  content: string,
): Promise<Result<Comment, Error>> {
  try {
    if (type === "ARTIST") {
      const comment = await db.comment.create({
        data: {
          artistId: commentedId,
          ownerId: ownerId,
          content: content,
          rate: rate,
          type: type,
        },
      });
      return [comment, null];
    }

    if (type === "TRACK") {
      const comment = await db.comment.create({
        data: {
          trackId: commentedId,
          ownerId: ownerId,
          content: content,
          rate: rate,
          type: type,
        },
      });
      return [comment, null];
    }

    if (type === "RECORDING") {
      const comment = await db.comment.create({
        data: {
          recordingId: commentedId,
          ownerId: ownerId,
          content: content,
          rate: rate,
          type: type,
        },
      });
      return [comment, null];
    }

    throw new Error("Invalid comment type");
  } catch (error) {
    return [null, error as Error];
  }
}

export async function updateCommentInternal(
  commentId: string,
  rate: number,
  content: string,
): Promise<Result<Comment, Error>> {
  try {
    const comment = await db.comment.update({
      where: { id: commentId },
      data: {
        rate,
        content,
      },
    });
    return [comment, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function readComment(
  commentId: string,
): Promise<Result<Comment, Error>> {
  try {
    const comment = await db.comment.findUnique({ where: { id: commentId } });
    if (!comment) {
      throw Error("Comment not founded");
    }
    return [comment, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function deleteCommentInternal(
  commentId: string,
): Promise<Result<Comment, Error>> {
  try {
    const comment = await db.comment.delete({ where: { id: commentId } });
    return [comment, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function findComment(
  ownerId: string,
  commentedId: string,
  type: CommentType,
): Promise<Result<Comment, Error>> {
  try {
    let comment = null;
    switch (type) {
      case "ARTIST":
        comment = await db.comment.findFirst({
          where: {
            artistId: commentedId,
            ownerId: ownerId,
          },
        });
        break;
      case "RECORDING":
        comment = await db.comment.findFirst({
          where: {
            recordingId: commentedId,
            ownerId: ownerId,
          },
        });
        break;
      case "TRACK":
        comment = await db.comment.findFirst({
          where: {
            trackId: commentedId,
            ownerId: ownerId,
          },
        });
        break;
      default:
        throw new Error("Invalid comment type");
    }

    if (comment !== null) {
      return [comment, null];
    } else {
      throw new Error("Comment not found");
    }
  } catch (error) {
    return [null, error as Error];
  }
}

export async function createComment(
  objectId: string,
  creatorId: string,
  commentType: CommentType,
  rate: number,
  content: string,
): Promise<Result<Comment, Error>> {
  try {
    const [, notFoundProfileError] = await readProfile(creatorId);
    if (notFoundProfileError) throw notFoundProfileError;

    const [comment, _] = await findComment(creatorId, objectId, commentType);
    if (comment) throw Error("Comment already exist");

    const [createdComment, errorCreatedComment] = await createCommentInternal(
      creatorId,
      objectId,
      commentType,
      rate,
      content,
    );
    if (errorCreatedComment) throw errorCreatedComment;

    const notUpdatedStats = await updateStats(objectId, commentType);
    if (notUpdatedStats) throw notUpdatedStats;

    return [createdComment, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function deleteComment(
  objectId: string,
  commentId: string,
  commentType: CommentType,
): Promise<Result<Comment, Error>> {
  try {
    const [comment, notDeletedCommentError] =
      await deleteCommentInternal(commentId);
    if (notDeletedCommentError) throw notDeletedCommentError;

    const notUpdatedStats = await updateStats(objectId, commentType);
    if (notUpdatedStats) throw notUpdatedStats;

    return [comment, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function updateComment(
  objectId: string,
  commentId: string,
  rate: number,
  content: string,
  commentType: CommentType,
): Promise<Result<Comment, Error>> {
  try {
    const [checkComment, notFoundedComment] = await readComment(commentId);
    if (notFoundedComment) throw notFoundedComment;

    if (checkComment.type !== commentType)
      throw Error("Type of this comment is different");

    const [comment, notUpdatedComment] = await updateCommentInternal(
      commentId,
      rate,
      content,
    );
    if (notUpdatedComment) throw notUpdatedComment;

    const notUpdatedStats = await updateStats(objectId, commentType);
    if (notUpdatedStats) throw notUpdatedStats;

    return [comment, null];
  } catch (error) {
    return [null, error as Error];
  }
}

export async function updateStats(
  entityId: string,
  entityType: CommentType,
): Promise<null | Error> {
  try {
    let entity;
    let statsModel: any;

    switch (entityType) {
      case "ARTIST":
        entity = await db.artist.findUnique({
          where: { id: entityId },
          include: { comments: { select: { rate: true } } },
        });
        statsModel = db.artistStats;
        break;
      case "TRACK":
        entity = await db.track.findUnique({
          where: { id: entityId },
          include: { comments: { select: { rate: true } } },
        });
        statsModel = db.trackStats;
      case "RECORDING":
        entity = await db.recording.findUnique({
          where: { id: entityId },
          include: { comments: { select: { rate: true } } },
        });
        statsModel = db.recordingStats;
        break;
      default:
        throw new Error("Unknown entity type");
    }

    if (!entity) {
      throw new Error("Entity was not found");
    }

    const { comments } = entity;
    const numberOfRatings = comments.length;
    const totalRate = comments.reduce(
      (total, comment) => total + comment.rate,
      0,
    );
    const avgRate =
      numberOfRatings > 0 ? Math.round(totalRate / numberOfRatings) : 0;

    await statsModel.upsert({
      where: { ownerId: entityId },
      update: { avg_rating: avgRate, amount_of_ratings: numberOfRatings },
      create: {
        avg_rating: avgRate,
        amount_of_ratings: numberOfRatings,
        ownerId: entityId,
      },
    });

    return null;
  } catch (error) {
    return error as Error;
  }
}
