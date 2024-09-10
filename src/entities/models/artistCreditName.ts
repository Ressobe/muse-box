import { z } from "zod";

export const artistCreditNameSchema = z.object({
  artistCreditId: z.string(),
  artistId: z.string(),
  position: z.number(),
  name: z.string(),
  joinPhrase: z.string().nullable(),
});

export type ArtistCreditName = z.infer<typeof artistCreditNameSchema>;
