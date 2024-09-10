import { z } from "zod";

export const sessionSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  image: z.string().optional(),
  isOAuth: z.boolean().optional(),
});

export type Session = z.infer<typeof sessionSchema>;
