import { z } from "zod";

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    bio: z.optional(z.string()),
    password: z.optional(
      z.string().min(8, { message: "Passowrd require minimum 8 characters" }),
    ),
    newPassword: z.optional(
      z.string().min(8, { message: "Passowrd require minimum 8 characters" }),
    ),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    },
  );

export type Settings = z.infer<typeof settingsSchema>;
