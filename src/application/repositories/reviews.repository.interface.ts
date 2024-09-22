import { Content } from "@/src/entities/models/content";
import {
  Review,
  ReviewWithAlbum,
  ReviewWithAlbumAndUser,
  ReviewWithAlbumRelations,
  ReviewWithArtist,
  ReviewWithTrack,
  ReviewWithTrackAndUser,
  ReviewWithTrackRelations,
  ReviewWithUser,
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

  getReviewForArtistOwnedByUser(
    artistId: string,
    userId: string,
  ): Promise<ReviewWithUser | undefined>;

  getReviewsForArtistNotOwnedByUser(
    artistId: string,
    userId: string,
    limit?: number,
  ): Promise<ReviewWithUser[]>;

  getReviewForAlbumOwnedByUser(
    albumId: string,
    userId: string,
  ): Promise<ReviewWithAlbumAndUser | undefined>;

  getReviewForTrackOwnedByUser(
    trackId: string,
    userId: string,
  ): Promise<ReviewWithTrackAndUser | undefined>;

  getReviewsForArtist(
    artistId: string,
    offset: number,
    limit?: number,
  ): Promise<ReviewWithUser[]>;

  getReviewsForAlbum(
    albumId: string,
    offset: number,
    limit?: number,
  ): Promise<ReviewWithUser[]>;

  getReviewsForTrack(
    trackId: string,
    offset: number,
    limit?: number,
  ): Promise<ReviewWithUser[]>;

  getArtistsReviewsOwnedByUser(
    userId: string,
    limit?: number,
  ): Promise<ReviewWithArtist[]>;

  getAlbumsReviewsOwnedByUser(
    userId: string,
    limit?: number,
  ): Promise<ReviewWithAlbumRelations[]>;

  getTracksReviewsOwnedByUser(
    userId: string,
    limit?: number,
  ): Promise<ReviewWithTrackRelations[]>;

  getReviewsCountForArtist(artistId: string): Promise<number>;
  getReviewsCountForAlbum(albumId: string): Promise<number>;
  getReviewsCountForTrack(trackId: string): Promise<number>;
}
