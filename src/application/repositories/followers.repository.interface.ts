import { Follow } from "@/src/entities/models/follow";

export interface IFollowersRepository {
  insertFollow(followerId: string, followingId: string): Promise<Follow>;
  deleteFollow(followerId: string, followingId: string): Promise<Follow>;
  getFollow(
    followerId: string,
    followingId: string,
  ): Promise<Follow | undefined>;
}
