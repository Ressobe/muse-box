import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmailUseCase } from "@/src/application/use-cases/verification-token/get-verification-token-by-email.use-case";
import { removeVerificationTokenUseCase } from "@/src/application/use-cases/verification-token/remove-verification-token.use-case";
import { createVerificationTokenUseCase } from "@/src/application/use-cases/verification-token/create-verification-token.use-case";
import { InputParseError } from "@/src/entities/errors/common";
import { z } from "zod";

const inputSchema = z.object({
  email: z.string().email(),
});

type ControllerInput = z.infer<typeof inputSchema>;

export async function generateVerificationTokenController(
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

  const existingToken = await getVerificationTokenByEmailUseCase(email);
  if (existingToken) {
    await removeVerificationTokenUseCase(existingToken.id);
  }

  const tokenId = await createVerificationTokenUseCase(email, token, expires);
  if (tokenId) return { email, token, expires };

  return null;
}
