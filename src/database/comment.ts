import db from "@/src/lib/db";
import { Comment, CommentType } from "@prisma/client";
import { CommentResult, Result } from "../types/database";

export async function createComment(
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

export async function updateComment(
  commentId: string,
  rate: number,
  content: string,
): Promise<CommentResult> {
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

export async function deleteComment(
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
