import { getFollowUseCase } from "@/src/application/use-cases/follow/get-follow.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  userId: z.string(),
  profileId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function isUserFollowingProfileController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError(
      "Invalid input in isUserFollowingProfileController",
    );
  }

  const { userId, profileId } = data;

  const follow = await getFollowUseCase(userId, profileId);

  return !!follow;
}
