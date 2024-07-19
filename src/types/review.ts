import {
  reviewsAlbums,
  reviewsArtists,
  reviewsTracks,
} from "@/database/schema";
import { Entity } from ".";

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

export type OptimisticAction =
  | { type: "add"; review: Review }
  | { type: "edit"; review: Review }
  | { type: "delete"; reviewId: string };

export const reviewTables = {
  artist: reviewsArtists,
  album: reviewsAlbums,
  track: reviewsTracks,
};
