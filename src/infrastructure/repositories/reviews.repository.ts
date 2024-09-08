import {
  reviewsAlbums,
  reviewsArtists,
  reviewsTracks,
} from "@/drizzle/database/schema";
import { IReviewsRepository } from "@/src/application/repositories/reviews.repository.interface";
import { Content } from "@/src/entities/models/content";
import {
  Review,
  ReviewWithAlbum,
  ReviewWithArtist,
  ReviewWithTrack,
} from "@/src/entities/models/review";
import { db } from "@/drizzle/database/db";
import { and, eq } from "drizzle-orm";

const reviewTables = {
  artist: reviewsArtists,
  album: reviewsAlbums,
  track: reviewsTracks,
};

export class ReviewsRepository implements IReviewsRepository {
  async getReview(
    reviewId: string,
    type: Content,
  ): Promise<Review | undefined> {
    const table = reviewTables[type];

    if (!table) {
      throw new Error(`Unsupported entity type: ${type}`);
    }

    const [review] = await db
      .select()
      .from(table)
      .where(eq(table.id, reviewId));

    return review;
  }

  async findReviewForUser(
    userId: string,
    entityId: string,
    type: Content,
  ): Promise<Review | undefined> {
    const table = reviewTables[type];

    if (!table) {
      throw new Error(`Unsupported entity type: ${type}`);
    }

    const [review] = await db
      .select()
      .from(table)
      .where(and(eq(table.userId, userId), eq(table.entityId, entityId)));

    return review;
  }

  async insertReview(
    entityId: string,
    userId: string,
    comment: string,
    rating: number,
    type: Content,
  ): Promise<Review> {
    const table = reviewTables[type];

    if (!table) {
      throw new Error(`Unsupported entity type: ${type}`);
    }

    const [review] = await db
      .insert(table)
      .values({
        entityId: entityId,
        userId: userId,
        comment: comment,
        rating: rating,
        createdAt: new Date(),
      })
      .returning();
    return review;
  }

  async deleteReview(
    entityId: string,
    type: Content,
    reviewId: string,
  ): Promise<Review> {
    const table = reviewTables[type];

    if (!table) {
      throw new Error(`Unsupported entity type: ${type}`);
    }

    const [review] = await db
      .delete(table)
      .where(and(eq(table.entityId, entityId), eq(table.id, reviewId)))
      .returning();

    return review;
  }

  async updateReview(
    reviewId: string,
    entityId: string,
    userId: string,
    comment: string,
    rating: number,
    type: Content,
  ) {
    const table = reviewTables[type];

    if (!table) {
      throw new Error(`Unsupported entity type: ${type}`);
    }

    const [review] = await db
      .update(table)
      .set({
        comment,
        rating,
        createdAt: new Date(),
      })
      .where(
        and(
          eq(table.id, reviewId),
          eq(table.userId, userId),
          eq(table.entityId, entityId),
        ),
      )
      .returning();

    return review;
  }

  async getLatestReviewsForUser(
    userId: string,
  ): Promise<(ReviewWithArtist | ReviewWithAlbum | ReviewWithTrack)[]> {
    const LIMIT = 5;

    const artistReviews = await db.query.reviewsArtists.findMany({
      where: eq(reviewsArtists.userId, userId),
      with: {
        artist: true,
      },
      limit: LIMIT,
    });

    const albumsReviews = await db.query.reviewsAlbums.findMany({
      where: eq(reviewsAlbums.userId, userId),
      with: {
        album: true,
      },
      limit: LIMIT,
    });

    const trackReviews = await db.query.reviewsTracks.findMany({
      where: eq(reviewsTracks.userId, userId),
      with: {
        track: true,
      },
      limit: LIMIT,
    });

    const allReviews = [...artistReviews, ...albumsReviews, ...trackReviews];

    return allReviews
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return dateB - dateA;
      })
      .slice(0, LIMIT);
  }
}
