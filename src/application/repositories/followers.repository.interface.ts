import {
  AmountOfFollowersAndFollowing,
  Follow,
  FollowerUser,
  FollowingUser,
} from "@/src/entities/models/follow";

export interface IFollowersRepository {
  insertFollow(followerId: string, followingId: string): Promise<Follow>;
  deleteFollow(followerId: string, followingId: string): Promise<Follow>;
  getFollow(
    followerId: string,
    followingId: string,
  ): Promise<Follow | undefined>;

  getFollowersForProfile(profileId: string): Promise<FollowerUser[]>;
  getFollowingForProfile(profileId: string): Promise<FollowingUser[]>;
  getAmountOfFollowersAndFollowingForUser(
    userId: string,
  ): Promise<AmountOfFollowersAndFollowing>;
}
