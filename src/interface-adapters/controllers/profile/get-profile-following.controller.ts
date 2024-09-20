import { getProfileFollowingUseCase } from "@/src/application/use-cases/profile/get-profile-following.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { FollowingUser } from "@/src/entities/models/follow";
import { z } from "zod";

const inputSchema = z.object({
  profileId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

function presenter(followingUsers: FollowingUser[]) {
  return followingUsers.map((item) => item.followingUser);
}

export async function getProfileFollowingController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in getProfileFollowingController");
  }

  const { profileId } = data;

  const following = await getProfileFollowingUseCase(profileId);

  return presenter(following);
}
