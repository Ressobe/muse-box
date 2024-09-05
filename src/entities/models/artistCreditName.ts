import { z } from "zod";

export const artistCreditName = z.object({
  artistCreditId: z.string(),
  artistId: z.string(),
  position: z.number(),
  name: z.string(),
  joinPhrase: z.string().optional(),
});

export type ArtistCreditName = z.infer<typeof artistCreditName>;
