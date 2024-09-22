import { createProfileUseCase } from "@/src/application/use-cases/profile/create-profile.use-case";
import { createUserUseCase } from "@/src/application/use-cases/user/create-user.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function createUserController(input: ControllerInput) {
  const { error, data } = inputSchema.safeParse(input);

  if (error) {
    throw new InputParseError("Invalid input in createUserController");
  }

  const { email, name, password } = data;

  const user = await createUserUseCase(email, name, password);

  await createProfileUseCase(user.id);

  return user;
}
