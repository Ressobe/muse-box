import { getProfileUseCase } from "@/src/application/use-cases/profile/get-profile.use-case";
import { InputParseError, NotFoundError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  profileId: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function getProfileInfoController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError("Invalid input in getProfileInfoController");
  }

  const { profileId } = data;

  const profile = await getProfileUseCase(profileId);

  if (!profile) {
    throw new NotFoundError("Profile not founded");
  }

  return profile;
}
