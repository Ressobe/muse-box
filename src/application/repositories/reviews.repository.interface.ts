import { Content } from "@/src/entities/models/content";
import { Review } from "@/src/entities/models/review";

// TODO: Return types

export interface IReviewsRepository {
  getReview(reviewId: string): Promise<Review>;
  findReview(reviewId: string, type: Content): Promise<Review>;

  insertReview(
    entityId: string,
    userId: string,
    comment: string,
    rating: number,
    type: Content,
  ): Promise<Review>;

  deleteReview(
    entityId: string,
    type: Content,
    reviewId: string,
  ): Promise<Review>;

  updateReview(
    reviewId: string,
    entityId: string,
    userId: string,
    comment: string,
    rating: number,
    type: Content,
  ): Promise<Review>;

  getLatestReviewsForUser(userId: string): Promise<void>;
}
