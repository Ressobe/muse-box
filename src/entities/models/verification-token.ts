import { z } from "zod";

export const verificationTokenSchema = z.object({
  id: z.string(),
  token: z.string(),
  expires: z.date(),
  email: z.string().email(),
});

export type VerificationToken = z.infer<typeof verificationTokenSchema>;
