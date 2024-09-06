import { z } from "zod";

export const passwordTokenSchema = z.object({
  id: z.string(),
  token: z.string(),
  expires: z.number(),
  email: z.string().email(),
});

export type PasswordToken = z.infer<typeof passwordTokenSchema>;
