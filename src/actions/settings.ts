"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { SettingsSchema } from "@/schemas/auth";
import { currentUser } from "@/lib/auth";
import {
  getUserByEmail,
  getUserById,
  getUserByName,
  updateUser,
} from "@/data-access/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export async function settingsAction(values: z.infer<typeof SettingsSchema>) {
  const user = await currentUser();
  if (!user) {
    return { error: "Unauthorized !" };
  }

  if (!user.id) {
    return { error: "Unauthorized !" };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "Unauthorized !" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existngUserByEmail = await getUserByEmail(values.email);
    if (existngUserByEmail && existngUserByEmail.id !== user.id) {
      return { error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(values.email);
    if (!verificationToken) {
      return { error: "Something went wrong" };
    }
    await sendVerificationEmail(
      verificationToken.token,
      verificationToken.email,
    );
  }

  if (values.name && values.name !== user.name) {
    const existngUserByName = await getUserByName(values.name);
    if (existngUserByName && existngUserByName.id !== user.id) {
      return { error: "Name already in use!" };
    }
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await updateUser(dbUser.id, values);

  return { sucess: "Settings updated!" };
}
