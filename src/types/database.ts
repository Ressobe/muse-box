import { Comment } from "@prisma/client";

export type CommentSucess = [Comment, null];
export type CommentFail = [null, Error];
export type CommentResult = CommentSucess | CommentFail;
