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
  ReviewWithAlbumAndUser,
  ReviewWithArtist,
  ReviewWithTrack,
  ReviewWithTrackAndUser,
  ReviewWithUser,
} from "@/src/entities/models/review";
import { db } from "@/drizzle/database/db";
import { and, count, desc, eq, not } from "drizzle-orm";

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

  async getReviewForArtistOwnedByUser(
    artistId: string,
    userId: string,
  ): Promise<ReviewWithUser | undefined> {
    return await db.query.reviewsArtists.findFirst({
      where: and(
        eq(reviewsArtists.userId, userId),
        eq(reviewsArtists.entityId, artistId),
      ),
      with: {
        user: {
          columns: {
            password: false,
          },
        },
      },
    });
  }

  async getReviewsForArtistNotOwnedByUser(
    artistId: string,
    userId: string,
    limit?: number,
  ): Promise<ReviewWithUser[]> {
    return db.query.reviewsArtists.findMany({
      where: and(
        eq(reviewsArtists.entityId, artistId),
        not(eq(reviewsArtists.userId, userId)),
      ),
      with: {
        user: {
          columns: {
            password: false,
          },
        },
      },
      limit,
      orderBy: desc(reviewsArtists.createdAt),
    });
  }

  async getReviewsCountForArtist(artistId: string): Promise<number> {
    const [c] = await db
      .select({ count: count() })
      .from(reviewsArtists)
      .where(eq(reviewsArtists.entityId, artistId));
    return c.count;
  }

  async getReviewsCountForAlbum(albumId: string): Promise<number> {
    const [c] = await db
      .select({ count: count() })
      .from(reviewsAlbums)
      .where(eq(reviewsAlbums.entityId, albumId));
    return c.count;
  }

  async getReviewsCountForTrack(trackId: string): Promise<number> {
    const [c] = await db
      .select({ count: count() })
      .from(reviewsTracks)
      .where(eq(reviewsTracks.entityId, trackId));
    return c.count;
  }

  async getReviewForAlbumOwnedByUser(
    albumId: string,
    userId: string,
  ): Promise<ReviewWithAlbumAndUser | undefined> {
    return await db.query.reviewsAlbums.findFirst({
      where: and(
        eq(reviewsAlbums.userId, userId),
        eq(reviewsAlbums.entityId, albumId),
      ),
      with: {
        album: true,
        user: true,
      },
    });
  }

  async getReviewForTrackOwnedByUser(
    trackId: string,
    userId: string,
  ): Promise<ReviewWithTrackAndUser | undefined> {
    return await db.query.reviewsTracks.findFirst({
      where: and(
        eq(reviewsTracks.userId, userId),
        eq(reviewsTracks.entityId, trackId),
      ),
      with: {
        track: true,
        user: true,
      },
    });
  }

  async getReviewsForArtist(
    artistId: string,
    offset = 0,
    limit?: number,
  ): Promise<ReviewWithUser[]> {
    return await db.query.reviewsArtists.findMany({
      where: eq(reviewsArtists.entityId, artistId),
      with: {
        user: true,
      },
      offset,
      orderBy: desc(reviewsArtists.createdAt),
      limit,
    });
  }

  async getReviewsForAlbum(
    albumId: string,
    offset = 0,
    limit?: number,
  ): Promise<ReviewWithUser[]> {
    return await db.query.reviewsAlbums.findMany({
      where: eq(reviewsAlbums.entityId, albumId),
      with: {
        user: true,
      },
      orderBy: desc(reviewsAlbums.createdAt),
      offset,
      limit,
    });
  }

  async getReviewsForTrack(
    trackId: string,
    offset = 0,
    limit?: number,
  ): Promise<ReviewWithUser[]> {
    return await db.query.reviewsTracks.findMany({
      where: eq(reviewsTracks.entityId, trackId),
      with: {
        user: true,
      },
      offset,
      orderBy: desc(reviewsTracks.createdAt),
      limit,
    });
  }
}
