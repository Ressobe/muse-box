import { z } from "zod";

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.number(),
  password: z.string(),
  image: z.string(),
});

export type User = z.infer<typeof userSchema>;
