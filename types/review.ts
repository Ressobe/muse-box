import {
  reviewsAlbums,
  reviewsArtists,
  reviewsTracks,
} from "@/drizzle/database/schema";
import { ReviewWithUser } from "@/src/entities/models/review";

export type Review = {
  id: string;
  userId: string;
  entityId: string;
  rating: number;
  comment: string | null;
  createdAt: Date | null;
  user: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
  };
};

export type OptimisticActionReview =
  | { type: "add"; review: ReviewWithUser }
  | { type: "edit"; review: ReviewWithUser }
  | { type: "delete"; reviewId: string };

export const reviewTables = {
  artist: reviewsArtists,
  album: reviewsAlbums,
  track: reviewsTracks,
};

export type TArtistReview = {
  id: string;
  userId: string;
  entityId: string;
  rating: number;
  comment: string | null;
  createdAt: Date | null;
  entityType: string;
  artist: {
    id: string;
    name: string;
    image: string | null;
    bio: string | null;
    country: string | null;
  };
};

export type TAlbumReview = {
  id: string;
  userId: string;
  entityId: string;
  rating: number;
  comment: string | null;
  createdAt: Date | null;
  entityType: string;
  album: {
    id: string;
    image: string | null;
    artistId: string;
    typeId: number;
    title: string;
    length: number | null;
    releaseDate: Date | null;
  };
};

export type TTrackReview = {
  id: string;
  userId: string;
  entityId: string;
  rating: number;
  comment: string | null;
  createdAt: Date | null;
  entityType: string;
  track: {
    id: string;
    image: string | null;
    title: string;
    length: number | null;
    albumId: string;
    position: number;
  };
};
