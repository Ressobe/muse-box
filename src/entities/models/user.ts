import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.date().nullable().optional(),
  password: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
});

export type User = z.infer<typeof userSchema>;
