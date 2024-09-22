import { getPasswordResetTokenByEmailUseCase } from "@/src/application/use-cases/password-reset-tokens/get-password-reset-token-by-email.use-case";
import { removePasswordResetTokenUseCase } from "@/src/application/use-cases/password-reset-tokens/remove-password-reset-token.use-case";
import { createPasswordResetTokenUseCase } from "@/src/application/use-cases/password-reset-tokens/create-password-reset-token.use-case";
import { v4 as uuidv4 } from "uuid";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  email: z.string().email(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function generatePasswordResetTokenController(
  input: ControllerInput,
) {
  const { error, data } = inputSchema.safeParse(input);
  if (error) {
    throw new InputParseError(
      "Invalid input in generatePasswordResetTokenController",
    );
  }

  const { email } = data;

  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmailUseCase(email);
  if (existingToken) {
    await removePasswordResetTokenUseCase(existingToken.id);
  }

  const passwordResetToken = await createPasswordResetTokenUseCase(
    email,
    token,
    expires,
  );

  return passwordResetToken;
}
