"use server";

import { getUserByEmailUseCase } from "@/src/application/use-cases/user/get-user-by-email.use-case";
import { verifyUserUseCase } from "@/src/application/use-cases/user/verify-user.use-case";
import { getVerificationTokenUseCase } from "@/src/application/use-cases/verification-token/get-verification-token.use-case";
import { removeVerificationTokenUseCase } from "@/src/application/use-cases/verification-token/remove-verification-token.use-case";

export async function newVerificationAction(token: string) {
  const existingToken = await getVerificationTokenUseCase(token);

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    await removeVerificationTokenUseCase(existingToken.id);
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmailUseCase(existingToken.email);
  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await verifyUserUseCase(existingUser.id, existingToken.email);
  await removeVerificationTokenUseCase(existingToken.id);

  return { sucess: "Email verified!" };
}
