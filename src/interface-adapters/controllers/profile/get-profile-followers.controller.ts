import { getProfileFollowersUseCase } from "@/src/application/use-cases/profile/get-profile-followers.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { FollowerUser } from "@/src/entities/models/follow";
import { z } from "zod";

const inputSchema = z.object({
  profileId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

function presenter(followers: FollowerUser[]) {
  return followers.map((item) => item.followerUser);
}

export async function getProfileFollowersController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in getProfileFollowersController");
  }

  const { profileId } = data;
  const followers = await getProfileFollowersUseCase(profileId);

  return presenter(followers);
}
