import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullable().optional(),
  password: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

export const userSelectSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email().nullable().optional(),
  emailVerified: z.date().nullable().optional(),
  password: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;
