import { z } from "zod";
import { userSchema } from "./user";

export const followSchema = z.object({
  followerId: z.string(),
  followingId: z.string(),
});

export type Follow = z.infer<typeof followSchema>;

export const followerUserSchema = z.object({
  followerUser: userSchema,
});

export type FollowerUser = z.infer<typeof followerUserSchema>;

export const followingUserSchema = z.object({
  followingUser: userSchema,
});

export type FollowingUser = z.infer<typeof followingUserSchema>;

export const amountOfFollowersAndFollowingSchema = z.object({
  amountOfFollowers: z.number(),
  amountOfFollowing: z.number(),
});

export type AmountOfFollowersAndFollowing = z.infer<
  typeof amountOfFollowersAndFollowingSchema
>;
