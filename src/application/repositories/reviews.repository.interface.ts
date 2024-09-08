import { Content } from "@/src/entities/models/content";
import {
  Review,
  ReviewWithAlbum,
  ReviewWithArtist,
  ReviewWithTrack,
} from "@/src/entities/models/review";

export interface IReviewsRepository {
  getReview(reviewId: string, type: Content): Promise<Review | undefined>;
  findReviewForUser(
    userId: string,
    reviewId: string,
    type: Content,
  ): Promise<Review | undefined>;

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

  getLatestReviewsForUser(
    userId: string,
  ): Promise<(ReviewWithArtist | ReviewWithAlbum | ReviewWithTrack)[]>;
}
