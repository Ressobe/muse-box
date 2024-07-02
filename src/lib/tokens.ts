import {
  insertVerificationToken,
  getVerificationTokenByEmail,
  removeVerificationTokenById,
} from "@/data-access/verification-token";
// import {
//   createPasswordResetToken,
//   getPasswordResetTokenByEmail,
//   removePasswordResetTokenById,
// } from "@/data-access/password-reset-token";
import { v4 as uuidv4 } from "uuid";

// export async function generatePasswordResetToken(email: string) {
//   const token = uuidv4();
//   const expires = new Date(new Date().getTime() + 3600 * 1000);
//
//   const existingToken = await getPasswordResetTokenByEmail(email);
//   if (existingToken) {
//     await removePasswordResetTokenById(existingToken.id);
//   }
//
//   const passwordResetToken = await createPasswordResetToken(
//     email,
//     token,
//     expires,
//   );
//
//   return passwordResetToken;
// }

export async function generateVerificationToken(email: string) {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await removeVerificationTokenById(existingToken.id);
  }

  const tokenId = await insertVerificationToken(email, token, expires);
  if (tokenId) return { email, token, expires };

  return null;
}
