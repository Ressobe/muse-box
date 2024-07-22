import { db } from "@/database/db";
import * as z from "zod";
import { SettingsSchema } from "@/schemas/auth";
import {
  playlists,
  reviewsAlbums,
  reviewsArtists,
  reviewsTracks,
  users,
} from "@/database/schema";
import { and, eq } from "drizzle-orm";

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  });
}

export async function getUserById(userId: string) {
  return await db.query.users.findFirst({
    where: eq(users.id, userId),
  });
}

export async function createUser(
  email: string,
  name: string,
  password: string,
) {
  const [user] = await db
    .insert(users)
    .values({
      email: email,
      name: name,
      password: password,
    })
    .returning();
  return user;
}

export async function verifyUser(userId: string, email: string) {
  await db
    .update(users)
    .set({
      email: email,
      emailVerified: new Date(),
    })
    .where(eq(users.id, userId));
}

export async function updateUserPassword(userId: string, newPassword: string) {
  await db
    .update(users)
    .set({ password: newPassword })
    .where(eq(users.id, userId));
}

export async function updateUserImage(userId: string, newImage: string) {
  await db.update(users).set({ image: newImage }).where(eq(users.id, userId));
}

export async function updateUser(
  userId: string,
  values: z.infer<typeof SettingsSchema>,
) {
  await db
    .update(users)
    .set({
      ...values,
    })
    .where(eq(users.id, userId));
}

export async function getUserArtistReview(userId: string, artistId: string) {
  return await db.query.reviewsArtists.findFirst({
    where: and(
      eq(reviewsArtists.userId, userId),
      eq(reviewsArtists.entityId, artistId),
    ),
  });
}

export async function getUserAlbumReview(userId: string, albumId: string) {
  return await db.query.reviewsAlbums.findFirst({
    where: and(
      eq(reviewsAlbums.userId, userId),
      eq(reviewsAlbums.entityId, albumId),
    ),
  });
}

export async function getUserTrackReview(userId: string, trackId: string) {
  return await db.query.reviewsTracks.findFirst({
    where: and(
      eq(reviewsTracks.userId, userId),
      eq(reviewsTracks.entityId, trackId),
    ),
  });
}

export async function getUserPlaylists(userId: string) {
  return await db.query.playlists.findMany({
    where: eq(playlists.userId, userId),
    with: {
      items: true,
    },
  });
}
