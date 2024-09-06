import { z } from "zod";

export const artistCreditSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type ArtistCredit = z.infer<typeof artistCreditSchema>;
